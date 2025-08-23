namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class TestEvaluationResultDto
    {
        public int TestSessionId { get; set; }
        public double TotalScore { get; set; }
        public double MaxTotalScore { get; set; } = 0;
        public string UserFullname { get; set; } = "";
        public DateTime StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public List<QuestionResultDto> Results { get; set; } = new();
    }


}
