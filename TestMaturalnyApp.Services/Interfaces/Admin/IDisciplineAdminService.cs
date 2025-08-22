using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces.Admin
{
    public interface IDisciplineAdminService
    {
        Task<PagedResult<Discipline>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null);
        Task<Discipline?> GetByIdAsync(int id);
        Task<Discipline> CreateAsync(Discipline entity);
        Task<Discipline> UpdateAsync(Discipline entity);
        Task<bool> DeleteAsync(int id);
    }

}
