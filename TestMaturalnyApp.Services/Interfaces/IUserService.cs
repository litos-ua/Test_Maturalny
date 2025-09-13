using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Models;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<PagedResult<UserDto>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy,
            string? sortOrder,
            string? filterJson);
        Task<IEnumerable<ConversationUserDto>> GetAllowedContactsAsync(int currentUserId);
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<User> CreateAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(int id);
        Task<bool> ExistsByEmailAsync(string email);
    }

}
