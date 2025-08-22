using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class DisciplineDtoMapper
    {
        public static DisciplineDto MapToDto(Discipline d) => new()
        {
            id = d.Id,
            Name = d.Name
        };
    }
}
