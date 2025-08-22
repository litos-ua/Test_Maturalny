
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class UserAnswerDto
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public DateTime SubmittedAt { get; set; }
        public string? Explanation { get; set; }
        public double Score { get; set; }
        public int AnswerInt { get; set; }
        public List<int> SelectedOptionIds { get; set; } = new();
    }
}
