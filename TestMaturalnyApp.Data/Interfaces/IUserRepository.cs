using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Interfaces
{
     public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();

        Task<PagedResult<User>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy,
            string? sortOrder,
            string? filterJson);

        Task<IEnumerable<User>> GetAllowedContactsAsync(int currentUserId, UserRole currentRole);
        Task<User?> GetByIdAsync(int id);

        Task<User?> GetByEmailAsync(string email);

        Task CreateAsync(User user);

        Task UpdateAsync(User user);

        Task DeleteAsync(int id);

        Task<bool> ExistsByEmailAsync(string email);
        Task<User?> GetByResetTokenAsync(string token);

    }
}
