
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class AnswerOptionForExamDtoMapper
    {
        public static AnswerOptionForExamDto MapToDto(AnswerOption option) => new()
    {
        id = option.Id,
        Text = option.Text,
        MatchLabel = option.MatchLabel,
        Explanation = option.Explanation,
        QuestionId = option.QuestionId,
        GroupKey = option.GroupKey
    };

    public static AnswerOptionDto MapToDomain(AnswerOptionForExamDto dto) => new()
    {
        id = dto.id,
        Text = dto.Text,
        MatchLabel = dto.MatchLabel,
        Explanation = dto.Explanation,
        GroupKey = dto.GroupKey,
        //QuestionId = dto.QuestionId  // Поля нет в Dto, оно только в полной модели
    };
    }
}
