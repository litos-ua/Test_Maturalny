using System.ComponentModel.DataAnnotations;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities
{
    public class TestSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string? Description { get; set; }

        // JSON маска для перемешивания опций вопросов
        public string JsonMask { get; set; } = "{}";

        public DateTime StartedAt { get; set; } = DateTime.UtcNow;

        public DateTime? EndedAt { get; set; }

        // Лимит времени в секундах 
        public int? TimeLimitSeconds { get; set; }

        // Причина завершения сессии
        public SessionEndReason? EndReason { get; set; }

        public ICollection<UserAnswer> UserAnswers { get; set; } = new List<UserAnswer>();
    }

}
