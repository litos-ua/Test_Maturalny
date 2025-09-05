using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Domain.Entities;

/// <summary>
/// Ответ пользователя на конкретный вопрос
/// </summary>
public class UserAnswer
{
    public int Id { get; set; }

    public int UserId { get; set; }                   
    public int QuestionId { get; set; }
    public Question Question { get; set; } = null!;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public string? Explanation { get; set; }            // Пояснение к выбору

    public double Score { get; set; } = 0; // Поддержка частичного балла

    // поле: JSON-массив ID выбранных опций
    public List<int> SelectedOptionJson { get; set; } = new();

    public string? GroupeLabel { get; set; }  // Резерв

    public int? AnswerInt { get; set; } // Резерв

    public int? TestSessionId { get; set; } 

    public TestSession? TestSession { get; set; }
}
