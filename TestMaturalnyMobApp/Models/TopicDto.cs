namespace TestMaturalnyMobApp.Models;

public enum LevelType
{
    Basic = 0,
    Advanced = 1
}

public class TopicDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public LevelType Level { get; set; }
    public int DisciplineId { get; set; }
}

public class CreateTopicDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public LevelType Level { get; set; }
    public int DisciplineId { get; set; }
}

public class UpdateTopicDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public LevelType Level { get; set; }
    public int DisciplineId { get; set; }
}
