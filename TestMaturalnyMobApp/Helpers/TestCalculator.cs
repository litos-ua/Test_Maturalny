// Helpers/TestCalculator.cs
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Helpers;

public static class TestCalculator
{
    public static TestResult CalculateResults(
        List<Question> questions,
        Dictionary<int, List<int>> answers,
        Dictionary<int, List<LeftItem>> leftItemsMap,
        int? disciplineId = null,
        Dictionary<int, List<string>>? textAnswers = null) // Добавляем textAnswers последним параметром со значением по умолчанию для совместимости сигнатуры
    {
        double totalScore = 0;
        double maxTotalScore = 0;
        var results = new List<QuestionResult>();

        foreach (var q in questions)
        {
            var userAnswer = answers.ContainsKey(q.Id) ? answers[q.Id] : new List<int>();
            var correctAnswer = q.Options.Where(o => o.IsCorrect).Select(o => o.Id).ToList();
            var requiredCount = TestConfigHelpers.GetRequiredAnswerCount(disciplineId, q.Type, q.Options);

            bool isCorrect = false;
            double score = 0;

            switch (q.Type)
            {
                case QuestionType.SingleChoice:
                    isCorrect = userAnswer.Count == 1 && correctAnswer.Contains(userAnswer.FirstOrDefault());
                    score = isCorrect ? q.MaxScore : 0;
                    break;

                case QuestionType.DoubleChoice:
                    if (userAnswer.Count != requiredCount)
                    {
                        isCorrect = false;
                        score = 0;
                    }
                    else
                    {
                        var numCorrect = userAnswer.Count(id => correctAnswer.Contains(id));
                        isCorrect = numCorrect == requiredCount;
                        score = isCorrect ? q.MaxScore : 0;
                    }
                    break;

                case QuestionType.MultipleChoice:
                    var uniqueUserAnswers = userAnswer.Distinct().ToList();
                    var hasDuplicates = uniqueUserAnswers.Count != userAnswer.Count;

                    if (hasDuplicates)
                    {
                        isCorrect = false;
                        score = 0;
                    }
                    else
                    {
                        var numSelectedCorrect = uniqueUserAnswers.Count(id => correctAnswer.Contains(id));
                        var allowPartial = TestConfigHelpers.IsPartialScoreAllowed(disciplineId, QuestionType.MultipleChoice);

                        if (allowPartial)
                        {
                            score = Math.Min(numSelectedCorrect, q.MaxScore);
                            isCorrect = Math.Abs(score - q.MaxScore) < 0.001;
                        }
                        else
                        {
                            var isPerfect = numSelectedCorrect == requiredCount && userAnswer.Count == requiredCount;
                            score = isPerfect ? q.MaxScore : 0;
                            isCorrect = isPerfect;
                        }
                    }
                    break;

                case QuestionType.Matching:
                    int matchScore = 0;
                    var leftItemsMatching = leftItemsMap.ContainsKey(q.Id) ? leftItemsMap[q.Id] : new List<LeftItem>();

                    for (int idx = 0; idx < leftItemsMatching.Count; idx++)
                    {
                        var selectedId = idx < userAnswer.Count ? userAnswer[idx] : 0;
                        if (selectedId == -1) continue; // X1 - игнорируем
                        if (selectedId == leftItemsMatching[idx].Id)
                        {
                            matchScore++;
                        }
                    }

                    var allowPartialMatching = TestConfigHelpers.IsPartialScoreAllowed(disciplineId, QuestionType.Matching);

                    if (allowPartialMatching)
                    {
                        score = Math.Min(matchScore, q.MaxScore);
                        isCorrect = matchScore == leftItemsMatching.Count - 1;
                    }
                    else
                    {
                        var allPairsMatched = matchScore == leftItemsMatching.Count;
                        score = allPairsMatched ? q.MaxScore : 0;
                        isCorrect = allPairsMatched;
                    }
                    break;

                case QuestionType.CorrectSequence:
                    var leftItems = leftItemsMap.ContainsKey(q.Id) ? leftItemsMap[q.Id] : new List<LeftItem>();

                    // Получаем правильную последовательность
                    var correctSequence = new List<int>();
                    foreach (var item in leftItems)
                    {
                        var opt = q.Options.FirstOrDefault(o => o.Id == item.Id);
                        if (opt != null && !string.IsNullOrEmpty(opt.MatchLabel) && int.TryParse(opt.MatchLabel, out int label))
                        {
                            correctSequence.Add(label);
                        }
                    }

                    // Проверка полной последовательности
                    bool isPerfectMatch = userAnswer.Count == correctSequence.Count &&
                                         userAnswer.SequenceEqual(correctSequence);

                    // Определяем первую и последнюю позиции
                    int maxLabel = correctSequence.Any() ? correctSequence.Max() : 0;
                    int firstEventIndex = -1;
                    int lastEventIndex = -1;

                    for (int idx = 0; idx < leftItems.Count; idx++)
                    {
                        var opt = q.Options.FirstOrDefault(o => o.Id == leftItems[idx].Id);
                        if (opt != null && !string.IsNullOrEmpty(opt.MatchLabel) && int.TryParse(opt.MatchLabel, out int label))
                        {
                            if (label == 1) firstEventIndex = idx;
                            if (label == maxLabel) lastEventIndex = idx;
                        }
                    }

                    bool isFirstCorrect = firstEventIndex != -1 &&
                                         userAnswer.Count > firstEventIndex &&
                                         userAnswer[firstEventIndex] == 1;

                    bool isLastCorrect = lastEventIndex != -1 &&
                                        userAnswer.Count > lastEventIndex &&
                                        userAnswer[lastEventIndex] == maxLabel;

                    var allowPartialSequence = TestConfigHelpers.IsPartialScoreAllowed(disciplineId, QuestionType.CorrectSequence);

                    if (allowPartialSequence)
                    {
                        if (isPerfectMatch)
                        {
                            score = 3;
                            isCorrect = true;
                        }
                        else if (isFirstCorrect && isLastCorrect)
                        {
                            score = 2;
                            isCorrect = false;
                        }
                        else if (isFirstCorrect || isLastCorrect)
                        {
                            score = 1;
                            isCorrect = false;
                        }
                        else
                        {
                            score = 0;
                            isCorrect = false;
                        }
                    }
                    else
                    {
                        score = isPerfectMatch ? q.MaxScore : 0;
                        isCorrect = isPerfectMatch;
                    }
                    break;
                case QuestionType.OpenAnswer:
                    {
                        var userTexts = (textAnswers != null && textAnswers.ContainsKey(q.Id))
                            ? textAnswers[q.Id]
                            : new List<string>();

                        var correctOptions = q.Options.Where(o => o.IsCorrect).ToList();

                        if (correctOptions.Count == 0)
                        {
                            score = 0;
                            isCorrect = false;
                            break;
                        }

                        int correctCount = 0;

                        for (int i = 0; i < correctOptions.Count; i++)
                        {
                            var userRaw = (i < userTexts.Count) ? userTexts[i] : null;
                            var correctRaw = correctOptions[i].Text;

                            if (string.IsNullOrWhiteSpace(userRaw) || string.IsNullOrWhiteSpace(correctRaw))
                                continue;

                            // Как в React: сначала пробуем как числа
                            if (double.TryParse(userRaw, out var userNum)
                                && double.TryParse(correctRaw, out var correctNum))
                            {
                                if (Math.Abs(userNum - correctNum) < 0.0001)
                                    correctCount++;
                            }
                            else
                            {
                                // Как в React: строковое сравнение без нормализации
                                if (string.Equals(userRaw.Trim(), correctRaw.Trim(), StringComparison.Ordinal))
                                    correctCount++;
                            }
                        }

                        const int scorePerAnswer = 2;
                        var calculated = correctCount * scorePerAnswer;
                        var maxScore = q.MaxScore > 0 ? q.MaxScore : correctOptions.Count * scorePerAnswer;

                        score = Math.Min(calculated, maxScore);
                        isCorrect = correctCount == correctOptions.Count;
                        break;
                    }
            }

            totalScore += score;
            maxTotalScore += q.MaxScore;

            results.Add(new QuestionResult
            {
                QuestionId = q.Id,
                IsCorrect = isCorrect,
                UserAnswer = userAnswer,
                CorrectAnswer = correctAnswer,
                Score = (int)score
            });
        }

        return new TestResult
        {
            TotalScore = (int)totalScore,
            MaxTotalScore = (int)maxTotalScore,
            Results = results
        };
    }
}
