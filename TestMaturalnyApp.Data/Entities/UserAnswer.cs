using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//  Удаляем модель (таблицу) UserUnswerOptions и все связи с ней.
namespace TestMaturalnyApp.Data.Entities
{
    public class UserAnswer
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue)]
        public int UserId { get; set; }

        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Question Question { get; set; } = null!;

        [DataType(DataType.DateTime)]
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        [StringLength(500)]
        public string? Explanation { get; set; }

        [Range(0, 12)]
        public double Score { get; set; } = 0;

        // 🔄 Новое поле: JSON-массив ID выбранных опций
        public string? SelectedOptionJson { get; set; }

        [StringLength(300)]
        public string? GroupeLabel { get; set; }  // Резерв

        public int? AnswerInt { get; set; } // Резерв

        //  УДАЛЕНО   public ICollection<UserAnswerOption> SelectedOptions { get; set; }

        public int? TestSessionId { get; set; }


        [ForeignKey(nameof(TestSessionId))]
        public TestSession? TestSession { get; set; }
    }

}

