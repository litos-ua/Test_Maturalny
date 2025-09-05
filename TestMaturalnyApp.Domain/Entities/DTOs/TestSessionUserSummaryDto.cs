namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class TestSessionUserSummaryDto
    {
        public int SessionId { get; set; }
        public string DisciplineName { get; set; } = "";
        public DateTime StartedAt { get; set; }
        public TimeSpan Duration { get; set; }
        public double TotalScore { get; set; }
    }

}
