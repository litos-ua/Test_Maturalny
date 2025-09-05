using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities
{
    /// <summary>
    /// Подтема
    /// </summary>
    public class Topic
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;

        public LevelType Level { get; set; } 
        
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int DisciplineId { get; set; }
        public Discipline Discipline { get; set; } = null!;  // навигационное свойство для получения запроса по сессиям пользователя

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
