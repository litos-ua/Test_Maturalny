
namespace TestMaturalnyApp.Domain.Entities
{
    /// <summary>
    /// Варианты ответа
    /// </summary>
    public class AnswerOption
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public bool IsCorrect { get; set; }

        public string? Explanation { get; set; } // Доп. текст от пользователя (optional)

        public int QuestionId { get; set; }
        public Question Question { get; set; } = null!;

        // Для Matching
        // уникальный идентификатор сопоставления пары (например "grp1") ключ группы, по которому левые и правые пары сопоставляются
        public string? GroupKey { get; set; }
        // отображаемое значение правой части пары
        public string? MatchLabel { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }

}
