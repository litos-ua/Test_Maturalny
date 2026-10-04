// Models/LeftItem.cs
namespace TestMaturalnyMobApp.Models;

public class LeftItem
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? MatchLabel { get; set; }
}
