using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateQuestionDtoMapper
    {
        public static Question MapToDomain(CreateQuestionDto dto) => new()
        {
            Text = dto.Text,
            ImageUrl = dto.ImageUrl,
            Type = dto.Type,
            MaxScore = dto.MaxScore,
            Difficulty = dto.Difficulty,
            TopicId = dto.TopicId,
            CreatedAt = DateTime.UtcNow,
            Options = dto.Options.Select(CreateAnswerOptionDtoMapper.MapToDomain).ToList()
        };
    }
}
