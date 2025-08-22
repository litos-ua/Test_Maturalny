using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Create
{
    public class CreateQuestionDto
    {
        public string Text { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public QuestionType Type { get; set; }
        public int TopicId { get; set; }
        public double MaxScore { get; set; } = 1.0;
        public DifficultyOfQuestion Difficulty { get; set; } = DifficultyOfQuestion.Standard;

        public List<CreateAnswerOptionDto> Options { get; set; } = new();
    }
}
