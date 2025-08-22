using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class UpdateTopicDtoMapper
    {
        public static Topic MapToDomain(UpdateTopicDto dto) => new()
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            Level = dto.Level,
            DisciplineId = dto.DisciplineId,
            UpdatedAt = DateTime.UtcNow
        };
    }
}
