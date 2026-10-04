namespace TestMaturalnyMobApp.Services.Api;

public static class ApiEndpoints
{
    // ===== DISCIPLINES =====
    public const string Disciplines = "Disciplines";
    public const string DisciplineById = "Disciplines/{0}";

    // ===== TOPICS =====
    public const string Topics = "Topics";
    public const string TopicById = "Topics/{0}";
    public const string TopicsByDiscipline = "Topics/by-discipline/{0}";
}
