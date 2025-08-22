using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;


namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class QuestionDtoMapper
    {
        public static QuestionDto MapToDto(Question question) => new()
        {
            id = question.Id,
            Text = question.Text,
            ImageUrl = question.ImageUrl,
            Type = question.Type,
            MaxScore = question.MaxScore,
            Difficulty = question.Difficulty,
            TopicId = question.TopicId,
            Options = question.Options.Select(AnswerOptionDtoMapper.MapToDto).ToList(),
        };

        public static Question MapToDomain(QuestionDto dto) => new()
        {
            Id = dto.id,
            Text = dto.Text,
            ImageUrl = dto.ImageUrl,
            Type = dto.Type,
            MaxScore = dto.MaxScore,
            Difficulty = dto.Difficulty,
            TopicId = dto.TopicId,
            Options = dto.Options.Select(AnswerOptionDtoMapper.MapToDomain).ToList(),
        };
    }
}


