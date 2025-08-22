using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateUserOptionDtoMapper
    {
        public static UserOption MapToDomain(CreateUserOptionDto dto) => new()
        {
            UserId = dto.UserId,
            Theme = dto.Theme,
            Language = dto.Language,
            QuestionPreferencesJson = dto.QuestionPreferencesJson,
            AdminMessage = dto.AdminMessage,
            AverageScore = dto.AverageScore
        };
    }
}
