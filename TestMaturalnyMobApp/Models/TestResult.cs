namespace TestMaturalnyMobApp.Models;

public class QuestionResult
{
    public int QuestionId { get; set; }
    public bool IsCorrect { get; set; }
    public List<int> UserAnswer { get; set; } = new();
    public List<int> CorrectAnswer { get; set; } = new();
    public int Score { get; set; }
}

public class TestResult
{
    public int TotalScore { get; set; }
    public int MaxTotalScore { get; set; }
    public List<QuestionResult> Results { get; set; } = new();
}
