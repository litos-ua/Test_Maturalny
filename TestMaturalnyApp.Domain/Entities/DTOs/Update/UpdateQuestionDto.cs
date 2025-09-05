using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateQuestionDto
    {
        public int id { get; set; }
        public string Text { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public QuestionType Type { get; set; }
        public int TopicId { get; set; }
        public double MaxScore { get; set; } = 1.0;
        public DifficultyOfQuestion Difficulty { get; set; }
        public List<UpdateAnswerOptionDto> Options { get; set; } = new();
    }
}
