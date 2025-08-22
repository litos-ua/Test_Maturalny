namespace TestMaturalnyApp.Domain.Entities.DTOs.Models
{
    public class SubmitUserAnswerDto
    {
        public int QuestionId { get; set; }
        public List<int> SelectedOptionIds { get; set; } = new();
        public string? Explanation { get; set; }
    }

}
