using System.ComponentModel.DataAnnotations;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities
{
    public class TestSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string? Description { get; set; }

        // JSON маска для перемешивания (маска перемешивания) опций вопросов
        public string JsonMask { get; set; } = "{}";

        public DateTime StartedAt { get; set; } = DateTime.UtcNow;

        public DateTime? EndedAt { get; set; }

        // Лимит времени в секундах (например, 3600 или 7200)
        public int? TimeLimitSeconds { get; set; }

        // Причина завершения сессии
        public SessionEndReason? EndReason { get; set; }

        //public ICollection<UserAnswer> Answers { get; set; } = new List<UserAnswer>();  // дубликат

        public ICollection<UserAnswer> UserAnswers { get; set; } = new List<UserAnswer>();
    }

}
