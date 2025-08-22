using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;

namespace TestMaturalnyApp.Data.Repositories
{
    public class UserTokenRepository : IUserTokenRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UserTokenRepository> _logger;

        public UserTokenRepository(AppDbContext context, ILogger<UserTokenRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<UserToken>> GetAllAsync()
        {
            try
            {
                return await _context.UserTokens.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all tokens");
                throw;
            }
        }

        public async Task<IEnumerable<UserToken>> GetAllWithUserAsync()
        {
            try
            {
                return await _context.UserTokens.Include(t => t.User).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all tokens with users");
                throw;
            }
        }

        public async Task<UserToken?> GetLatestTokenByUserIdAsync(int userId)
        {
            try
            {
                return await _context.UserTokens
                    .Where(t => t.UserId == userId)
                    .OrderByDescending(t => t.CreatedAt)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting last token by userId: {UserId}", userId);
                throw;
            }
        }

        public async Task<UserToken?> GetByTokenAsync(string token)
        {
            try
            {
                return await _context.UserTokens
                    .Include(t => t.User)
                    .FirstOrDefaultAsync(t => t.Token == token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting token by value: {Token}", token);
                throw;
            }
        }

        public async Task<UserToken?> GetLatestTokenByEmailAsync(string email)
        {
            try
            {
                return await _context.UserTokens
                    .Include(t => t.User)
                    .Where(t => t.User.Email == email)
                    .OrderByDescending(t => t.CreatedAt)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting last token by email: {Email}", email);
                throw;
            }
        }

        public async Task<IEnumerable<UserToken>> GetByUserIdAsync(int userId)
        {
            try
            {
                return await _context.UserTokens
                    .Where(t => t.UserId == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting tokens by userId: {UserId}", userId);
                throw;
            }
        }

        public async Task<UserToken> CreateAsync(UserToken token)
        {
            try
            {
                _context.UserTokens.Add(token);
                await _context.SaveChangesAsync();
                return token;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating token");
                throw;
            }
        }

        public async Task UpdateAsync(UserToken token)
        {
            try
            {
                var existing = await _context.UserTokens.FindAsync(token.Id);
                if (existing != null)
                {
                    _context.Entry(existing).CurrentValues.SetValues(token);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning("Attempt to update non-existent token with id: {Id}", token.Id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating token with id: {Id}", token.Id);
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var token = await _context.UserTokens.FindAsync(id);
                if (token != null)
                {
                    _context.UserTokens.Remove(token);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning("Attempt to delete non-existent token with id: {Id}", id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting token with id: {Id}", id);
                throw;
            }
        }

        public async Task<UserToken> RevokeAsync(UserToken token, string ip)
        {
            try
            {
                token.RevokedAt = DateTime.UtcNow;
                token.RevokedByIp = ip;
                _context.UserTokens.Update(token);
                await _context.SaveChangesAsync();
                return token;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when revoking token with id: {Id}", token.Id);
                throw;
            }
        }
    }
}

