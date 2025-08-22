using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping;
using Microsoft.Extensions.Logging;

namespace TestMaturalnyApp.Services.Services
{
    public class UserTokenService : IUserTokenService
    {
        private readonly IUserTokenRepository _userTokenRepository;
        private readonly ILogger<UserTokenService> _logger;

        public UserTokenService(IUserTokenRepository userTokenRepository, ILogger<UserTokenService> logger)
        {
            _userTokenRepository = userTokenRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<UserToken>> GetAllAsync()
        {
            try
            {
                var dataEntities = await _userTokenRepository.GetAllAsync();
                return dataEntities.Select(UserTokenMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting all user tokens");
                throw;
            }
        }

        public async Task<UserToken?> GetLatestTokenByUserIdAsync(int userId)
        {
            try
            {
                var data = await _userTokenRepository.GetLatestTokenByUserIdAsync(userId);
                return data == null ? null : UserTokenMapper.MapToDomain(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting latest token for user ID {userId}");
                throw;
            }
        }

        public async Task<UserToken?> GetByTokenAsync(string token)
        {
            try
            {
                var data = await _userTokenRepository.GetByTokenAsync(token);
                return data == null ? null : UserTokenMapper.MapToDomain(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting token by value");
                throw;
            }
        }

        public async Task<IEnumerable<UserToken>> GetByUserIdAsync(int userId)
        {
            try
            {
                var dataList = await _userTokenRepository.GetByUserIdAsync(userId);
                return dataList.Select(UserTokenMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting tokens for user ID {userId}");
                throw;
            }
        }

        public async Task<UserToken> CreateAsync(UserToken domainToken)
        {
            try
            {
                var data = UserTokenMapper.MapToData(domainToken);
                var created = await _userTokenRepository.CreateAsync(data);
                return UserTokenMapper.MapToDomain(created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating user token");
                throw;
            }
        }

        public async Task UpdateAsync(UserToken domainToken)
        {
            try
            {
                var data = UserTokenMapper.MapToData(domainToken);
                await _userTokenRepository.UpdateAsync(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating token ID {domainToken?.Id}");
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                await _userTokenRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting token ID {id}");
                throw;
            }
        }

        public async Task<UserToken> RevokeAsync(UserToken domainToken, string ip)
        {
            try
            {
                var data = UserTokenMapper.MapToData(domainToken);
                var revoked = await _userTokenRepository.RevokeAsync(data, ip);
                return UserTokenMapper.MapToDomain(revoked);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while revoking token ID {domainToken?.Id} from IP {ip}");
                throw;
            }
        }
    }
}
