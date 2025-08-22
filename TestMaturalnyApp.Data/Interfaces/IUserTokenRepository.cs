using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface IUserTokenRepository
    {
        Task<IEnumerable<UserToken>> GetAllAsync();
        Task<IEnumerable<UserToken>> GetAllWithUserAsync();
        Task<UserToken?> GetLatestTokenByUserIdAsync(int userId);

        Task<UserToken?> GetByTokenAsync(string token);

        //Task<UserToken?> GetLatestByEmailAsync(string email);  // повтор

        Task<IEnumerable<UserToken>> GetByUserIdAsync(int userId);

        Task<UserToken> CreateAsync(UserToken token);

        Task UpdateAsync(UserToken token);

        Task DeleteAsync(int id);

        Task<UserToken?> GetLatestTokenByEmailAsync(string email);

        Task<UserToken> RevokeAsync(UserToken token, string ip);
    }
}
