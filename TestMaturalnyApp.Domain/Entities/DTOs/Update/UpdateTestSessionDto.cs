
namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateTestSessionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Description { get; set; }
        public int? TimeLimitSeconds { get; set; }
        public string JsonMask { get; set; } = "{}";
    }
}
