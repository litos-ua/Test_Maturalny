using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class TopicDtoMapper
    {
        public static TopicDto MapToDto(Topic topic) => new()
        {
            Id = topic.Id,
            Title = topic.Title,
            Description = topic.Description,
            Level = topic.Level,
            DisciplineId = topic.DisciplineId,
        };
    }
}
