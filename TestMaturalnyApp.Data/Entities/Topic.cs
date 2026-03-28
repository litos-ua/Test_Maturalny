using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Data.Entities
{
    public class Topic
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; } = null!;

        [Required]
        [Range(0, int.MaxValue)]
        public LevelType Level { get; set; }

        [Required, StringLength(4000)]
        public string Description { get; set; } = null!;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("Discipline")]
        public int DisciplineId { get; set; }
        public Discipline Discipline { get; set; } = null!;

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
