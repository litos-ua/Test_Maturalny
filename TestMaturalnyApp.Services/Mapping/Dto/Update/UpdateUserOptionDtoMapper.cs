using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateUserOptionDtoMapper
    {
        public static UserOption MapToDomain(UpdateUserOptionDto dto) => new()
        {
            Theme = dto.Theme,
            Language = dto.Language,
            QuestionPreferencesJson = dto.QuestionPreferencesJson,
            AdminMessage = dto.AdminMessage,
            AverageScore = dto.AverageScore
        };
    }
}

