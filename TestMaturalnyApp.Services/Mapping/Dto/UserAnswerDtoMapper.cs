using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class UserAnswerDtoMapper
    {
        public static UserAnswerDto MapToDto(UserAnswer domain)
        {
            return new UserAnswerDto
            {
                Id = domain.Id,
                QuestionId = domain.QuestionId,
                SubmittedAt = domain.SubmittedAt,
                Explanation = domain.Explanation,
                Score = domain.Score,
                SelectedOptionIds = domain.SelectedOptionJson ?? new List<int>()
            };
        }

        public static UserAnswer MapToDomain(UserAnswerDto dto)
        {
            return new UserAnswer
            {
                Id = dto.Id,
                QuestionId = dto.QuestionId,
                SubmittedAt = dto.SubmittedAt,
                Explanation = dto.Explanation,
                Score = dto.Score,
                SelectedOptionJson = dto.SelectedOptionIds
            };
        }
    }

}

