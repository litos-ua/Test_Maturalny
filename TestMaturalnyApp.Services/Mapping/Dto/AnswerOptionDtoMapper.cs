using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class AnswerOptionDtoMapper
    {
        public static AnswerOptionDto MapToDto(AnswerOption option) => new()
        {
            id = option.Id,
            Text = option.Text,
            IsCorrect = option.IsCorrect,
            Explanation = option.Explanation,
            QuestionId = option.QuestionId,
            GroupKey = option.GroupKey,
            MatchLabel = option.MatchLabel
        };

        public static AnswerOption MapToDomain(AnswerOptionDto dto) => new()
        {
            Id = dto.id,
            Text = dto.Text,
            IsCorrect = dto.IsCorrect,
            Explanation = dto.Explanation,
            QuestionId = dto.QuestionId,
            GroupKey = dto.GroupKey,
            MatchLabel = dto.MatchLabel
        };
    }
}
