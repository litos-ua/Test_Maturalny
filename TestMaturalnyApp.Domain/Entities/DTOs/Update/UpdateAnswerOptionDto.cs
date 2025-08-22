

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateAnswerOptionDto
    {
        public int id { get; set; }  
        public string Text { get; set; } = null!;
        public bool IsCorrect { get; set; }
        public string? Explanation { get; set; }
        public string? GroupKey { get; set; }
        public string? MatchLabel { get; set; }
        public int QuestionId { get; set; }
    }
}
