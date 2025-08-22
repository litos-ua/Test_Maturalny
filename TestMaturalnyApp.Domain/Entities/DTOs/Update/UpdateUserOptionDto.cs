

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateUserOptionDto
    {
        public int Id { get; set; }
        public string Theme { get; set; } = "light";

        public string Language { get; set; } = "uk";

        public string? QuestionPreferencesJson { get; set; }

        public string? AdminMessage { get; set; }

        public double AverageScore { get; set; } = 0.0;
    }
}
