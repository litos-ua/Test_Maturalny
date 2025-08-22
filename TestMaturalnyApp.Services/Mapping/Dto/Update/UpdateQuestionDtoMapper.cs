
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateQuestionDtoMapper
    {
        public static Question MapToDomain(UpdateQuestionDto dto) => new()
        {
            Id = dto.id,
            Text = dto.Text,
            ImageUrl = dto.ImageUrl,
            Type = dto.Type,
            TopicId = dto.TopicId,
            MaxScore = dto.MaxScore,
            Difficulty = dto.Difficulty,
            UpdatedAt = DateTime.UtcNow,
            Options = dto.Options.Select(UpdateAnswerOptionDtoMapper.MapToDomain).ToList()
        };
    }
}
