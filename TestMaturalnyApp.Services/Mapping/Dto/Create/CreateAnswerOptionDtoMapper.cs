using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateAnswerOptionDtoMapper
    {
        public static AnswerOption MapToDomain(CreateAnswerOptionDto dto) => new()
        {
            Text = dto.Text,
            IsCorrect = dto.IsCorrect,
            QuestionId = dto.QuestionId,
            Explanation = dto.Explanation,
            GroupKey = dto.GroupKey,
            MatchLabel = dto.MatchLabel,
            CreatedAt = DateTime.UtcNow
        };
    }
}
