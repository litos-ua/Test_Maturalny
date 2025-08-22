
namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class TestSessionQuestionDetailDto
    {
        public int QuestionNumber { get; set; } // UserAnswers.AnswersInt
        public string QuestionText { get; set; } = string.Empty;
        public string QuestionType { get; set; } = string.Empty;
        public int TopicId { get; set; }
        public string TopicTitle { get; set; } = string.Empty;
        public double MaxScore { get; set; } 
        public double Score { get; set; }
    }

}
