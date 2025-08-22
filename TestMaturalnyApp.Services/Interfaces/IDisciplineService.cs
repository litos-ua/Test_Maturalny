using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Services.Interfaces
{
        public interface IDisciplineService
        {
            Task<IEnumerable<Discipline>> GetAllAsync();
            Task<Discipline?> GetByIdAsync(int id);
            Task<Discipline> CreateAsync(Discipline domainDiscipline);
            Task<Discipline> UpdateAsync(Discipline domainDiscipline);
            Task<bool> DeleteAsync(int id);
        }
}