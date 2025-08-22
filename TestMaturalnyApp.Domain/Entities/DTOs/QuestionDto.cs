
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class QuestionDto
    {
        public int id { get; set; }
        public string Text { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public QuestionType Type { get; set; }
        public int TopicId { get; set; }
        public double MaxScore { get; set; } = 1.0;
        public DifficultyOfQuestion Difficulty { get; set; }

        public List<AnswerOptionDto> Options { get; set; } = new();
    }
}
