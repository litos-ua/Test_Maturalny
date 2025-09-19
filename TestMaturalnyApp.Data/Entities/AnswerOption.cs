using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestMaturalnyApp.Data.Entities
{
    public class AnswerOption
    {
        public int Id { get; set; }

        [Required, StringLength(400)]
        public string Text { get; set; } = null!;

        public bool IsCorrect { get; set; }

        [StringLength(500)]
        public string? Explanation { get; set; }

        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Question Question { get; set; } = null!;

        [StringLength(50)]
        public string? GroupKey { get; set; }     // для Matching

        [StringLength(200)]
        public string? MatchLabel { get; set; }   // для Matching

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
