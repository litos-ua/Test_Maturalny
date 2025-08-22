using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateTopicDtoMapper
    {
        public static Topic MapToDomain(CreateTopicDto dto) => new()
        {
            Title = dto.Title,
            Description = dto.Description,
            Level = dto.Level,
            DisciplineId = dto.DisciplineId
        };
    }
}
