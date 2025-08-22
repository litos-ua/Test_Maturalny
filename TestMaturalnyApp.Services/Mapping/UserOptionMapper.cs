
namespace TestMaturalnyApp.Services.Mapping
{
    public static class UserOptionMapper
    {
        public static Data.Entities.UserOption MapToData(Domain.Entities.UserOption domain) => new()
        {
            Id = domain.Id,
            UserId = domain.UserId,
            Theme = domain.Theme,
            Language = domain.Language,
            QuestionPreferencesJson = domain.QuestionPreferencesJson,
            AdminMessage = domain.AdminMessage,
            AverageScore = domain.AverageScore
        };

        public static Domain.Entities.UserOption MapToDomain(Data.Entities.UserOption data) => new()
        {
            Id = data.Id,
            UserId = data.UserId,
            Theme = data.Theme,
            Language = data.Language,
            QuestionPreferencesJson = data.QuestionPreferencesJson,
            AdminMessage = data.AdminMessage,
            AverageScore = data.AverageScore
        };

    }
}
