

namespace TestMaturalnyApp.Domain.Entities.DTOs.Create
{
    public class CreateUserAnswerDto
    {
        public int QuestionId { get; set; }
        public string? Explanation { get; set; }
        public double Score { get; set; } = 0;
        public int AnswerInt { get; set; }
        public List<int> SelectedOptionIds { get; set; } = new();
        public int? TestSessionId { get; set; }
    }
}
