

using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;


namespace TestMaturalnyApp.Services.Services.Utils
{
    public static class QuestionEvaluationHelper
    {
        public static (bool IsCorrect, double Score) EvaluateQuestion(
            Question question,
            List<int> userAnswerIds,
            List<int> correctAnswerIds)
        {
            bool isCorrect = false;
            double score = 0;

            switch (question.Type)
            {
                case QuestionType.SingleChoice:
                    isCorrect = userAnswerIds.Count == correctAnswerIds.Count &&
                                userAnswerIds.All(id => correctAnswerIds.Contains(id));
                    score = isCorrect ? 1 : 0;
                    break;

                case QuestionType.DoubleChoice:
                    if (userAnswerIds.Count != 2)
                    {
                        isCorrect = false;
                        score = 0;
                    }
                    else
                    {
                        int numCorrect = userAnswerIds.Count(id => correctAnswerIds.Contains(id));
                        int numIncorrect = userAnswerIds.Count(id => !correctAnswerIds.Contains(id));

                        if (numCorrect == 2 && numIncorrect == 0)
                        {
                            isCorrect = true;
                            score = 2;
                        }
                    }
                    break;

                case QuestionType.MultipleChoice:
                    {
                        var uniqueUserAnswers = userAnswerIds.Distinct().ToList();
                        int numCorrect = correctAnswerIds.Count;

                        if (uniqueUserAnswers.Count != userAnswerIds.Count || uniqueUserAnswers.Count != numCorrect)
                        {
                            score = 0;
                            isCorrect = false;
                        }
                        else
                        {
                            int numSelectedCorrect = uniqueUserAnswers.Count(id => correctAnswerIds.Contains(id));
                            score = numSelectedCorrect;
                            isCorrect = (score == numCorrect);
                        }
                        break;
                    }

                case QuestionType.Matching:
                    {
                        var expectedOptions = question.Options
                            .Where(o => o.GroupKey != null)
                            .OrderBy(o => o.Id)
                            .ToList();

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
                                matchScore++;
                        }

                        score = matchScore;
                        isCorrect = matchScore == expectedOptions.Count - 1;
                        break;
                    }

                case QuestionType.CorrectSequence:
                    {
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

                default:
                    throw new ArgumentOutOfRangeException($"Unsupported question type: {question.Type}");
            }

            return (isCorrect, score);
        }
    }
}

