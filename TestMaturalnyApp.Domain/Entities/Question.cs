using TestMaturalnyApp.Domain.Entities.Enums;


namespace TestMaturalnyApp.Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public string? ImageUrl { get; set; }

        public QuestionType Type { get; set; }

        public double MaxScore { get; set; } = 1.0;
        public DifficultyOfQuestion Difficulty { get; set; } = DifficultyOfQuestion.Standard;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public int TopicId { get; set; }
        public Topic Topic { get; set; } = null!;
        
        public ICollection<AnswerOption> Options { get; set; } = new List<AnswerOption>();
    }

}
