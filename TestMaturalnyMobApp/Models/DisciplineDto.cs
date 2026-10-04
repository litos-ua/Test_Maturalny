namespace TestMaturalnyMobApp.Models;

public class DisciplineDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class CreateDisciplineDto
{
    public string Name { get; set; } = string.Empty;
}

public class UpdateDisciplineDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
