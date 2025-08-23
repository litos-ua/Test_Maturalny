using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Models;


namespace TestMaturalnyApp.Data.Interfaces.Admin
{
    public interface IUserAdminRepository : IUserRepository
    {
        Task<PagedResult<User>> GetPagedAsync(
        int pageNumber,
        int pageSize,
        string? sortBy,
        string? sortOrder,
        string? filterJson);
    }
}
