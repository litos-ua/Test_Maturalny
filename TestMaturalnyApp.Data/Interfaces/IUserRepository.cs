using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Interfaces
{
     public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);

        Task<User?> GetByEmailAsync(string email);

        Task CreateAsync(User user);

        Task UpdateAsync(User user);

        Task DeleteAsync(int id);

        Task<bool> ExistsByEmailAsync(string email);
        Task<User?> GetByResetTokenAsync(string token);

    }
}
