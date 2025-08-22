
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class QuestionExportDto
    {
        public int QuestionId { get; set; }
        public string? QuestionText { get; set; }
        public List<int> SelectedOptionIds { get; set; } = new();
        public List<int> CorrectOptionIds { get; set; } = new();
        public double Score { get; set; }
    }
}
