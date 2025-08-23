
//using TestMaturalnyApp.Domain.Entities.Enums;

using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class TestSessionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Description { get; set; }
        public string JsonMask { get; set; } = "{}";
        public DateTime StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public int? TimeLimitSeconds { get; set; }
        public SessionEndReason? EndReason { get; set; }

        public string DisciplineName { get; set; } = "";
        public double TotalScore { get; set; }
        public TimeSpan Duration { get; set; }
    }


}
