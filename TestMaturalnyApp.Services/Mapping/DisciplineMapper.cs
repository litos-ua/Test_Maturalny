
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class DisciplineMapper
    {
        public static Domain.Entities.Discipline MapToDomain(Data.Entities.Discipline data)
        {
            return new Domain.Entities.Discipline
            {
                Id = data.Id,
                Name = data.Name,
                CreatedAt = data.CreatedAt,
                UpdatedAt = data.UpdatedAt
            };
        }

        public static Data.Entities.Discipline MapToData(Domain.Entities.Discipline domain)
        {
            return new Data.Entities.Discipline
            {
                Id = domain.Id,
                Name = domain.Name,
                CreatedAt = domain.CreatedAt,
                UpdatedAt = domain.UpdatedAt
            };
        }
    }
}
