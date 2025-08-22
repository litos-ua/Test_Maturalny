
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class UserStatisticsDto
    {
        public int UserId { get; set; }
        public int TotalSessions { get; set; }
        public double AverageScore { get; set; }
        public int PassedTests { get; set; }
    }
}
