namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class EvaluateTestRequestDto
    {
        public int TestSessionId { get; set; }
        public Dictionary<int, List<int>> Answers { get; set; } = new(); // questionId → selected option IDs
        public Dictionary<int, List<string>>? TextAnswers { get; set; }  // для OpenAnswer
    }

}
