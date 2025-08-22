using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IUserTokenService
    {
        Task<IEnumerable<UserToken>> GetAllAsync();
        Task<UserToken?> GetLatestTokenByUserIdAsync(int userId);
        Task<UserToken?> GetByTokenAsync(string token);
        Task<IEnumerable<UserToken>> GetByUserIdAsync(int userId);
        Task <UserToken>CreateAsync(UserToken token);
        Task UpdateAsync(UserToken token);
        Task DeleteAsync(int id);
        Task<UserToken> RevokeAsync(UserToken token, string ip);
    }

}
