namespace TestMaturalnyApp.Domain.Models
{
    public class ShuffleMask
    {
        public List<int> Questions { get; set; } = new();
        public Dictionary<int, List<int>> Options { get; set; } = new(); // questionId → shuffled optionIds
    }
}
