
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class DisciplineTestStatsDto
    {
        public int DisciplineId { get; set; }
        public string DisciplineName { get; set; } = null!;
        public int TotalAttempts { get; set; }
        public double AverageScore { get; set; }
    }

}
