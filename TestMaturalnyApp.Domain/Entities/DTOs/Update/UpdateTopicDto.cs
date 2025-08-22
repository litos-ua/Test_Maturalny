
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateTopicDto : CreateTopicDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public LevelType Level { get; set; }
        public int DisciplineId { get; set; }
    }
}
