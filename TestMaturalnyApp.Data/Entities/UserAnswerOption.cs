using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestMaturalnyApp.Data.Entities
{
    public class UserAnswerOption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserAnswerId { get; set; }

        [ForeignKey(nameof(UserAnswerId))]
        public UserAnswer UserAnswer { get; set; } = null!;

        [Required]
        public int AnswerOptionId { get; set; }

        [ForeignKey(nameof(AnswerOptionId))]
        public AnswerOption AnswerOption { get; set; } = null!;

        public int? MatchIndex { get; set; }

        [MaxLength(50)]
        public string? MatchLabel { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}

