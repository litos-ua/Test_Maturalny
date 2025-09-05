using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Services.Interfaces;
using System.Text.Json;


namespace TestMaturalnyApp.Services.Services
{
    public class TestEvaluationService : ITestEvaluationService
    {
        private readonly ITestSessionRepository _sessionRepo;
        private readonly IQuestionRepository _questionRepo;
        private readonly IUserAnswerRepository _answerRepo;

        public TestEvaluationService(
            ITestSessionRepository sessionRepo,
            IQuestionRepository questionRepo,
            IUserAnswerRepository answerRepo)
        {
            _sessionRepo = sessionRepo;
            _questionRepo = questionRepo;
            _answerRepo = answerRepo;
        }


        public async Task<TestEvaluationResultDto> EvaluateAsync(EvaluateTestRequestDto request)
        {
            try
            {
                var session = await _sessionRepo.GetByIdAsync(request.TestSessionId);
                if (session == null)
                    throw new Exception("Test session not found");

                var questionIds = request.Answers.Keys.ToList();
                var questions = await _questionRepo.GetByIdsWithOptionsAsync(questionIds);


                // Сортируем вопросы в том порядке, в котором пришли в запросе
                var questionsOrdered = questionIds
                    .Select(id => questions.FirstOrDefault(q => q.Id == id))
                    .Where(q => q != null)
                    .ToList();

                double totalScore = 0;
                double maxTotalScore = 0;
                var results = new List<QuestionResultDto>();

                foreach (var question in questionsOrdered)
                {
                    try
                    {
                        var userAnswerIds = request.Answers.GetValueOrDefault(question.Id) ?? new();
                        var correctAnswerIds = question.Options
                            .Where(o => o.IsCorrect)
                            .Select(o => o.Id)
                            .ToList();

                        bool isCorrect = false;
                        double score = 0;
                        maxTotalScore += question.MaxScore;

                        // Оценка
                        switch (question.Type)
                        {
                            case QuestionType.SingleChoice:
                                isCorrect = userAnswerIds.Count == correctAnswerIds.Count &&
                                            userAnswerIds.All(id => correctAnswerIds.Contains(id));
                                score = isCorrect ? 1 : 0;
                                break;

                            case QuestionType.DoubleChoice:
                                var correctOptionIds = correctAnswerIds;
                                if (userAnswerIds.Count != 2)
                                {
                                    isCorrect = false;
                                    score = 0;
                                }
                                else
                                {
                                    int numCorrect = userAnswerIds.Count(id => correctOptionIds.Contains(id));
                                    int numIncorrect = userAnswerIds.Count(id => !correctOptionIds.Contains(id));
                                    if (numCorrect == 2 && numIncorrect == 0)
                                    {
                                        isCorrect = true;
                                        score = 2;
                                    }
                                }
                                break;

                            case QuestionType.MultipleChoice:
                                int selectedCorrect = userAnswerIds.Intersect(correctAnswerIds).Count();
                                int selectedIncorrect = userAnswerIds.Except(correctAnswerIds).Count();

                                if (selectedCorrect == correctAnswerIds.Count && selectedIncorrect == 0)
                                {
                                    isCorrect = true;
                                    score = 2;
                                }
                                else if (selectedCorrect == correctAnswerIds.Count && selectedIncorrect == 1)
                                {
                                    isCorrect = false;
                                    score = 1;
                                }
                                break;


                            case QuestionType.Matching:
                                {
                                    var expectedOptions = question.Options
                                        .Where(o => o.GroupKey != null)
                                        .OrderBy(o => o.Id) // сортировка по Id как замена UI-порядку
                                        .ToList();

                                    // Проверка: размер должен совпадать
                                    if (userAnswerIds.Count != expectedOptions.Count)
                                    {
                                        score = 0;
                                        isCorrect = false;
                                        break;
                                    }

                                    int matchScore = 0;

                                    for (int i = 0; i < expectedOptions.Count; i++)
                                    {
                                        var expectedOptionId = expectedOptions[i].Id;
                                        var userAnswerId = userAnswerIds[i];

                                        if (userAnswerId == 0 || userAnswerId == -1)
                                            continue;

                                        if (userAnswerId == expectedOptionId)
                                        {
                                            matchScore++;
                                        }
                                    }

                                    score = matchScore;
                                    isCorrect = matchScore == expectedOptions.Count - 1;
                                    break;
                                }




                            case QuestionType.CorrectSequence:
                                var optionsInOrder = question.Options
                                    .Where(o => o.GroupKey != null)
                                    .OrderBy(o => o.GroupKey)
                                    .ToList();

                                var correctSequence = optionsInOrder
                                    .Select(o => int.TryParse(o.MatchLabel, out var parsed) ? parsed : -1)
                                    .ToList();

                                var userSequence = userAnswerIds;

                                bool isPerfectMatch = userSequence.SequenceEqual(correctSequence);

                                bool isFirstCorrect = userSequence.FirstOrDefault() == correctSequence.First();
                                bool isLastCorrect = userSequence.LastOrDefault() == correctSequence.Last();

                                if (isPerfectMatch)
                                {
                                    isCorrect = true;
                                    score = 3;
                                }
                                else if (isFirstCorrect && isLastCorrect)
                                {
                                    isCorrect = false;
                                    score = 2;
                                }
                                else if (isFirstCorrect || isLastCorrect)
                                {
                                    isCorrect = false;
                                    score = 1;
                                }
                                else
                                {
                                    isCorrect = false;
                                    score = 0;
                                }
                                break;

                        }

                        totalScore += score;

                        var validOptionIds = question.Options.Select(o => o.Id).ToHashSet();
                        var filteredOptionIds = userAnswerIds
                            .Where(optionId => validOptionIds.Contains(optionId))
                            .ToList();

                        // Сохраняем всё сразу, включая отфильтрованные ответы в JSON-поле
                        var uaData = new Data.Entities.UserAnswer
                        {
                            UserId = session.UserId,
                            QuestionId = question.Id,
                            SubmittedAt = DateTime.UtcNow,
                            Score = score,
                            TestSessionId = session.Id,
                            SelectedOptionJson = JsonSerializer.Serialize(filteredOptionIds)
                        };

                        await _answerRepo.CreateAsync(uaData);


                        results.Add(new QuestionResultDto
                        {
                            QuestionId = question.Id,
                            SelectedOptionIds = filteredOptionIds,
                            CorrectOptionIds = correctAnswerIds,
                            Score = score,
                            IsCorrect = isCorrect
                        });
                    }
                    catch (Exception innerEx)
                    {
                        Console.WriteLine($"❌ Ошибка при обработке вопроса {question.Id}: {innerEx.Message}");
                        throw;
                    }
                }

                session.EndedAt = DateTime.UtcNow;
                session.EndReason = SessionEndReason.CompletedByUser;
                await _sessionRepo.UpdateAsync(session);

                return new TestEvaluationResultDto
                {
                    TestSessionId = session.Id,
                    TotalScore = totalScore,
                    MaxTotalScore = maxTotalScore,
                    Results = results
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🔥 Общая ошибка при оценивании: {ex.Message}");
                throw;
            }
        }



        public async Task<TestEvaluationResultDto> EvaluateShuffleAsync(EvaluateTestRequestDto request)
        {
            try
            {
                var session = await _sessionRepo.GetByIdAsync(request.TestSessionId);
                if (session == null)
                    throw new Exception("Test session not found");

                // 1. Получаем маску смешивания из JsonMask
                var mask = JsonSerializer.Deserialize<ShuffleMask>(session.JsonMask ?? "{}");

                // 2. Получаем все вопросы по ID
                var questionIds = request.Answers.Keys.ToList();
                var questions = await _questionRepo.GetByIdsWithOptionsAsync(questionIds);

                // 3. Сортируем вопросы в том порядке, в котором пришли в запросе
                var questionsOrdered = questionIds
                    .Select(id => questions.FirstOrDefault(q => q.Id == id))
                    .Where(q => q != null)
                    .ToList();

                double totalScore = 0;
                double maxTotalScore = 0;
                var results = new List<QuestionResultDto>();

                foreach (var question in questionsOrdered)
                {
                    try
                    {
                        // 4. Восстанавливаем порядок опций из маски, если есть
                        if (mask?.Options.TryGetValue(question.Id, out var orderedOptionIds) == true)
                        {
                            question.Options = orderedOptionIds
                                .Select(id => question.Options.FirstOrDefault(o => o.Id == id))
                                .Where(o => o != null)
                                .ToList();
                        }

                        var userAnswerIds = request.Answers.GetValueOrDefault(question.Id) ?? new();
                        var correctAnswerIds = question.Options
                            .Where(o => o.IsCorrect)
                            .Select(o => o.Id)
                            .ToList();

                        bool isCorrect = false;
                        double score = 0;
                        maxTotalScore += question.MaxScore;

                        // Оценка
                        switch (question.Type)
                        {
                            case QuestionType.SingleChoice:
                                isCorrect = userAnswerIds.Count == correctAnswerIds.Count &&
                                            userAnswerIds.All(id => correctAnswerIds.Contains(id));
                                score = isCorrect ? 1 : 0;
                                break;

                            case QuestionType.DoubleChoice:
                                var correctOptionIds = correctAnswerIds;
                                if (userAnswerIds.Count != 2)
                                {
                                    isCorrect = false;
                                    score = 0;
                                }
                                else
                                {
                                    int numCorrect = userAnswerIds.Count(id => correctOptionIds.Contains(id));
                                    int numIncorrect = userAnswerIds.Count(id => !correctOptionIds.Contains(id));
                                    if (numCorrect == 2 && numIncorrect == 0)
                                    {
                                        isCorrect = true;
                                        score = 2;
                                    }
                                }
                                break;

                            case QuestionType.MultipleChoice:
                                int selectedCorrect = userAnswerIds.Intersect(correctAnswerIds).Count();
                                int selectedIncorrect = userAnswerIds.Except(correctAnswerIds).Count();

                                if (selectedCorrect == correctAnswerIds.Count && selectedIncorrect == 0)
                                {
                                    isCorrect = true;
                                    score = 2;
                                }
                                else if (selectedCorrect == correctAnswerIds.Count && selectedIncorrect == 1)
                                {
                                    isCorrect = false;
                                    score = 1;
                                }
                                break;




                            case QuestionType.Matching:
                                {
                                    var expectedOptions = question.Options
                                        .Where(o => o.GroupKey != null)
                                        .OrderBy(o => o.Id) // порядок в базе
                                        .ToList();

                                    var baseOptionIds = expectedOptions.Select(o => o.Id).ToList();
                                    var shuffledOptionIds = mask.Options.TryGetValue(question.Id, out var optIds) ? optIds : baseOptionIds;

                                    // Восстанавливаем порядок пользовательских ответов к базе
                                    var normalizedUserAnswers = NormalizeAnswerToBaseOrder(userAnswerIds, baseOptionIds, shuffledOptionIds);

                                    // Проверка: размер должен совпадать
                                    if (normalizedUserAnswers.Count != expectedOptions.Count)
                                    {
                                        score = 0;
                                        isCorrect = false;
                                        break;
                                    }

                                    int matchScore = 0;

                                    for (int i = 0; i < expectedOptions.Count; i++)
                                    {
                                        var expectedOptionId = expectedOptions[i].Id;
                                        var userAnswerId = normalizedUserAnswers[i];

                                        if (userAnswerId == 0 || userAnswerId == -1)
                                            continue;

                                        if (userAnswerId == expectedOptionId)
                                        {
                                            matchScore++;
                                        }
                                    }

                                    score = matchScore;
                                    isCorrect = matchScore == expectedOptions.Count - 1;
                                    break;
                                }



                            case QuestionType.CorrectSequence:
                                var optionsInOrder = question.Options
                                    .Where(o => o.GroupKey != null)
                                    .OrderBy(o => o.GroupKey)
                                    .ToList();

                                var correctSequence = optionsInOrder
                                    .Select(o => int.TryParse(o.MatchLabel, out var parsed) ? parsed : -1)
                                    .ToList();

                                var userSequence = userAnswerIds;

                                bool isPerfectMatch = userSequence.SequenceEqual(correctSequence);

                                bool isFirstCorrect = userSequence.FirstOrDefault() == correctSequence.First();
                                bool isLastCorrect = userSequence.LastOrDefault() == correctSequence.Last();

                                if (isPerfectMatch)
                                {
                                    isCorrect = true;
                                    score = 3;
                                }
                                else if (isFirstCorrect && isLastCorrect)
                                {
                                    isCorrect = false;
                                    score = 2;
                                }
                                else if (isFirstCorrect || isLastCorrect)
                                {
                                    isCorrect = false;
                                    score = 1;
                                }
                                else
                                {
                                    isCorrect = false;
                                    score = 0;
                                }
                                break;

                        }

                        totalScore += score;

                        var validOptionIds = question.Options.Select(o => o.Id).ToHashSet();
                        var filteredOptionIds = userAnswerIds
                            .Where(optionId => validOptionIds.Contains(optionId))
                            .ToList();

                        

                        results.Add(new QuestionResultDto
                        {
                            QuestionId = question.Id,
                            SelectedOptionIds = filteredOptionIds,
                            CorrectOptionIds = correctAnswerIds,
                            Score = score,
                            IsCorrect = isCorrect
                        });
                    }
                    catch (Exception innerEx)
                    {
                        Console.WriteLine($"❌ Error processing question {question.Id}: {innerEx.Message}");
                        throw;
                    }
                }

                session.EndedAt = DateTime.UtcNow;
                session.EndReason = SessionEndReason.CompletedByUser;
                await _sessionRepo.UpdateAsync(session);

                return new TestEvaluationResultDto
                {
                    TestSessionId = session.Id,
                    TotalScore = totalScore,
                    MaxTotalScore = maxTotalScore,
                    Results = results
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🔥 General error in evaluation: {ex.Message}");
                throw;
            }
        }

        public static List<int> NormalizeAnswerToBaseOrder(
            List<int> userAnswerIdsInUiOrder,
            List<int> originalOptionIdsFromDb,
            List<int> shuffledOptionIdsFromMask)
        {
            var normalized = new int[originalOptionIdsFromDb.Count];

            for (int i = 0; i < shuffledOptionIdsFromMask.Count; i++)
            {
                int shuffledOptionId = shuffledOptionIdsFromMask[i];
                int userSelectedAnswerId = (i < userAnswerIdsInUiOrder.Count)
                    ? userAnswerIdsInUiOrder[i]
                    : 0;

                int baseIndex = originalOptionIdsFromDb.IndexOf(shuffledOptionId);
                if (baseIndex >= 0)
                    normalized[baseIndex] = userSelectedAnswerId;
            }

            return normalized.ToList();
        }


    }

}

