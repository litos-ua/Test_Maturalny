using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateDisciplineDtoMapper
    {
        public static Discipline MapToDomain(UpdateDisciplineDto dto) => new()
        {
            Id = dto.id,
            Name = dto.Name,
            UpdatedAt = DateTime.UtcNow,
        };
    }
}
