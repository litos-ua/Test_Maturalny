namespace TestMaturalnyApp.Domain.Entities.DTOs.Create
{
    public class CreateAnswerOptionDto
    {
        public string Text { get; set; } = null!;
        public bool IsCorrect { get; set; }
        public string? Explanation { get; set; }
        public string? GroupKey { get; set; }
        public string? MatchLabel { get; set; }
        public int QuestionId { get; set; }
    }
}
