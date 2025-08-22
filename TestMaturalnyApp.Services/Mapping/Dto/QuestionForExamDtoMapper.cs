using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class QuestionForExamDtoMapper
    {
        public static QuestionForExamDto MapToDto(Question question) => new()
        {
            id = question.Id,
            Text = question.Text,
            ImageUrl = question.ImageUrl,
            Type = question.Type,
            Options = question.Options
            .Select(AnswerOptionForExamDtoMapper.MapToDto)
            .ToList()
        };

        public static QuestionDto MapToDomain(QuestionForExamDto dto) => new()
        {
            id = dto.id,
            Text = dto.Text,
            ImageUrl = dto.ImageUrl,
            Type = dto.Type,
            Options = dto.Options
            .Select(AnswerOptionForExamDtoMapper.MapToDomain)
            .ToList()
        };
    }
}
