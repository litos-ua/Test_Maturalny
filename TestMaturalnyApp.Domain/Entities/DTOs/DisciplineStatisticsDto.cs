
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class DisciplineStatisticsDto
    {
        public int DisciplineId { get; set; }
        public int TotalAttempts { get; set; }
        public double AverageScore { get; set; }
        public string DisciplineName { get; set; } = string.Empty;
        public int TotalQuestions { get; set; }
        public int TotalTestSessions { get; set; }
        public int TotalUsers { get; set; }
    }
}
