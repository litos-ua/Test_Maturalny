using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces.Admin
{
    public interface IUserAdminService : IUserService
    {
        Task<PagedResult<UserDto>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy,
            string? sortOrder,
            string? filterJson);
    }

}
