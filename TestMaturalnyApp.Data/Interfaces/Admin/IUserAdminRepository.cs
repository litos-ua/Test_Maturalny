using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Models;


namespace TestMaturalnyApp.Data.Interfaces.Admin
{
    public interface IUserAdminRepository : IUserRepository
    {
        //Task<(IEnumerable<User> Users, int TotalCount)> GetPagedAsync(
        //    int pageNumber,
        //    int pageSize,
        //    string? sortBy,
        //    string? sortOrder,
        //    string? filterJson);
        Task<PagedResult<User>> GetPagedAsync(
        int pageNumber,
        int pageSize,
        string? sortBy,
        string? sortOrder,
        string? filterJson);
    }
}
