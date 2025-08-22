using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateDisciplineDtoMapper
    {
        public static Discipline MapToDomain(CreateDisciplineDto dto) => new()
        {
            Name = dto.Name
        };
    }
}
