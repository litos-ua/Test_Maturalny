using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface IDisciplineRepository
    {
        Task<IEnumerable<Discipline>> GetAllAsync();
        Task<Discipline?> GetByIdAsync(int id);
        Task<Discipline> CreateAsync(Discipline entity);
        Task<Discipline> UpdateAsync(Discipline entity);
        Task<bool> DeleteAsync(int id);
    }
}

