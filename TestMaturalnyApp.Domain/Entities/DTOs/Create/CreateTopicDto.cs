using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Create
{
    public class CreateTopicDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public LevelType Level { get; set; }
        public int DisciplineId { get; set; }
    }
}
