using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface IUserOptionRepository
    {
        Task<UserOption?> GetByUserIdAsync(int userId);
        Task<UserOption?> GetByIdAsync(int id);
        Task CreateAsync(UserOption option);
        Task UpdateAsync(UserOption option);
        Task DeleteAsync(int id);
        Task<bool> UserExistsAsync(int userId);
    }

}
