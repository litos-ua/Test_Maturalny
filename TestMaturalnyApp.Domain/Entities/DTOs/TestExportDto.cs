
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class TestExportDto
    {
        public int SessionId { get; set; }
        public int UserId { get; set; }
        public string? Description { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public double TotalScore { get; set; }
        public List<QuestionExportDto> Questions { get; set; } = new();
    }
}
