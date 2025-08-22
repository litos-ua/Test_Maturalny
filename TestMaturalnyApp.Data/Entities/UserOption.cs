
using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Data.Entities
{
    public class UserOption
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        [Required, MaxLength(20)]
        public string Theme { get; set; } = "light";

        [Required, MaxLength(10)]
        public string Language { get; set; } = "uk";

        public bool ReceiveEmailNotifications { get; set; } = true;

        // Настройки генерации вопросов (JSON)
        public string? QuestionPreferencesJson { get; set; }

        // Сообщения от преподавателей / админов
        public string? AdminMessage { get; set; }

        public double AverageScore { get; set; } = 0.0;

        public bool? ReservedFlag { get; set; }
        public int? ReservedCount { get; set; }

        [MaxLength(200)]
        public string? ReservedNote { get; set; }
    }
}
