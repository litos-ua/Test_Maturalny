
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class UserOptionDtoMapper
    {
        public static UserOptionDto MapToDto(UserOption domain)
        {
            return new UserOptionDto
            {
                Id = domain.Id,
                UserId = domain.UserId,
                Theme = domain.Theme,
                Language = domain.Language,
                QuestionPreferencesJson = domain.QuestionPreferencesJson,
                AdminMessage = domain.AdminMessage,
                AverageScore = domain.AverageScore
            };
        }

        public static UserOption MapToDomain(UserOptionDto dto)
        {
            return new UserOption
            {
                Id = dto.Id,
                UserId = dto.UserId,
                Theme = dto.Theme,
                Language = dto.Language,
                QuestionPreferencesJson = dto.QuestionPreferencesJson,
                AdminMessage = dto.AdminMessage,
                AverageScore = dto.AverageScore
            };
        }
    }
}
