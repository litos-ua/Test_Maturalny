
namespace TestMaturalnyApp.Domain.Entities.DTOs.Create
{
    public class CreateTestSessionDto
    {
        public int UserId { get; set; }
        public string? Description { get; set; }
        public int? TimeLimitSeconds { get; set; }
        public string JsonMask { get; set; } = "{}";
    }

}
