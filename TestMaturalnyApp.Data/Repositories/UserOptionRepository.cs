using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;

namespace TestMaturalnyApp.Data.Repositories
{
    public class UserOptionRepository : IUserOptionRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<UserOption> _dbSet;
        private readonly ILogger<UserOptionRepository> _logger;

        public UserOptionRepository(AppDbContext context, ILogger<UserOptionRepository> logger)
        {
            _context = context;
            _dbSet = context.Set<UserOption>();
            _logger = logger;
        }

        public async Task<UserOption?> GetByUserIdAsync(int userId)
        {
            try
            {
                return await _dbSet.FirstOrDefaultAsync(o => o.UserId == userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user settings by userId: {UserId}", userId);
                throw;
            }
        }

        public async Task<UserOption?> GetByIdAsync(int id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting option by id: {Id}", id);
                throw;
            }
        }

        public async Task CreateAsync(UserOption option)
        {
            try
            {
                await _dbSet.AddAsync(option);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user option");
                throw;
            }
        }

        public async Task UpdateAsync(UserOption option)
        {
            try
            {
                _context.Entry(option).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user option with id: {Id}", option.Id);
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var option = await _dbSet.FindAsync(id);
                if (option != null)
                {
                    _dbSet.Remove(option);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning("Attempt to delete non-existent option with id: {Id}", id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user option with id: {Id}", id);
                throw;
            }
        }

        public async Task<bool> UserExistsAsync(int userId)
        {
            try
            {
                return await _context.Users.AnyAsync(u => u.Id == userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking existence of user with id: {UserId}", userId);
                throw;
            }
        }
    }
}
