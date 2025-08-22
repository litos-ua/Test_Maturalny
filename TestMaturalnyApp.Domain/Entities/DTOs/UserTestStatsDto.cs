
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class UserTestStatsDto
    {
        public int UserId { get; set; }
        public int TotalSessions { get; set; }
        public double AverageScore { get; set; }
        public double MaxScore { get; set; }
        public double MinScore { get; set; }
    }

}
