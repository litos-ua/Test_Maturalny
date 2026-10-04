// Helpers/TestConfigHelpers.cs
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Helpers;

public static class TestConfigHelpers
{
    public static int GetRequiredAnswerCount(int? disciplineId, QuestionType type, List<AnswerOption> options)
    {
        switch (type)
        {
            case QuestionType.SingleChoice:
                return 1;
            case QuestionType.DoubleChoice:
                return 2;
            case QuestionType.MultipleChoice:
                // Возвращаем количество правильных ответов
                return options.Count(o => o.IsCorrect);
            case QuestionType.Matching:
                // Возвращаем количество правильных пар (опций с matchLabel)
                return options.Count(o => o.IsCorrect && !string.IsNullOrEmpty(o.MatchLabel));
            case QuestionType.CorrectSequence:
                // Возвращаем количество элементов в последовательности
                return options.Count(o => o.IsCorrect);
            case QuestionType.OpenAnswer:
                return options.Count(o => o.IsCorrect);
            default:
                return 1;
        }
    }

    public static bool IsPartialScoreAllowed(int? disciplineId, QuestionType type)
    {
        // Для НМТ разрешены частичные баллы для определенных типов
        switch (type)
        {
            case QuestionType.MultipleChoice:
            case QuestionType.Matching:
            case QuestionType.CorrectSequence:
                return true;
            case QuestionType.OpenAnswer:
                return false;
            default:
                return false;
        }
    }
}
