using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [Required, StringLength(500)]
        public string Text { get; set; } = null!;

        [DataType(DataType.ImageUrl)]
        public string? ImageUrl { get; set; }

        [Required]
        public QuestionType Type { get; set; }

        [Range(0, 12)]
        public double MaxScore { get; set; } = 1.0;

        [Required]
        public DifficultyOfQuestion Difficulty { get; set; } = DifficultyOfQuestion.Standard;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("Topic")]
        public int TopicId { get; set; }
        public Topic Topic { get; set; } = null!;


        public ICollection<AnswerOption> Options { get; set; } = new List<AnswerOption>();
    }
}
