
namespace TestMaturalnyApp.Domain.Entities.DTOs.Models
{
    public class RandomTestSessionDto
    {
        public int SessionId { get; set; }
        public List<QuestionDto> Questions { get; set; } = new();
    }

}
