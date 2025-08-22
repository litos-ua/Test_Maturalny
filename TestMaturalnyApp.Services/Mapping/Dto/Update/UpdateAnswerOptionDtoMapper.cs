using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateAnswerOptionDtoMapper
    {
        public static AnswerOption MapToDomain(UpdateAnswerOptionDto dto) => new()
        {
            Id = dto.id,
            Text = dto.Text,
            IsCorrect = dto.IsCorrect,
            QuestionId = dto.QuestionId,
            Explanation = dto.Explanation,
            GroupKey = dto.GroupKey,
            MatchLabel = dto.MatchLabel,
            UpdatedAt = DateTime.UtcNow
        };
    }
}
