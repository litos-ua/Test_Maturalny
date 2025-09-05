namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class EvaluateTestRequestDto
    {
        public int TestSessionId { get; set; }
        public Dictionary<int, List<int>> Answers { get; set; } = new(); // questionId → selected option IDs
    }

}
