using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Domain.Entities;

/// <summary>
/// Ответ пользователя на конкретный вопрос
/// </summary>
public class UserAnswer
{
    public int Id { get; set; }

    public int UserId { get; set; }                     // Идентификатор пользователя
    public int QuestionId { get; set; }
    public Question Question { get; set; } = null!;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public string? Explanation { get; set; }            // Пояснение к выбору (опционально)

    public double Score { get; set; } = 0; // Поддержка частичного балла

    // 🔄 Новое поле: JSON-массив ID выбранных опций
    public List<int> SelectedOptionJson { get; set; } = new();

    public string? GroupeLabel { get; set; }  // Резерв

    public int? AnswerInt { get; set; } // Резерв

    //  УДАЛЕНО  public ICollection<UserAnswerOption> SelectedOptions { get; set; } = new List<UserAnswerOption>();

    public int? TestSessionId { get; set; } // Cвойства для связи с TestSession

    public TestSession? TestSession { get; set; }
}
