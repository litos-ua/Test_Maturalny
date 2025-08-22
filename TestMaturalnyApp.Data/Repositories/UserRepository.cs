
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories
{
    public class UserRepository : IUserRepository, IUserAdminRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<User> _dbSet;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(AppDbContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _dbSet = context.Set<User>();
            _logger = logger;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            try
            {
                return await _dbSet.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all users");
                throw;
            }
        }

        // Для админ
        public async Task<PagedResult<User>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy,
            string? sortOrder,
            string? filterJson)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            try
            {

                var query = _context.Users.AsQueryable();

                // 🔍 Фильтрация (если есть filterJson)
                if (!string.IsNullOrEmpty(filterJson))
                {
                    // Здесь можно распарсить filterJson в ключ-значение и наложить Where()
                }

                // 📌 Сортировка
                if (!string.IsNullOrEmpty(sortBy))
                {
                    if (sortOrder?.ToLower() == "desc")
                        query = query.OrderByDescending(e => EF.Property<object>(e, sortBy));
                    else
                        query = query.OrderBy(e => EF.Property<object>(e, sortBy));
                }
                else
                {
                    query = query.OrderBy(e => e.Id); // сортировка по умолчанию
                }

                var totalCount = await query.CountAsync();
                var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return new PagedResult<User>
                {
                    Items = items,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting paged users");
                throw;
            }
        }


        public async Task<User?> GetByIdAsync(int id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by id: {Id}", id);
                throw;
            }
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            try
            {
                return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by email: {Email}", email);
                throw;
            }
        }

        public async Task CreateAsync(User user)
        {
            try
            {
                await _dbSet.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user");
                throw;
            }
        }

        public async Task UpdateAsync(User user)
        {
            try
            {
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user with id: {Id}", user.Id);
                throw;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var user = await _dbSet.FindAsync(id);
                if (user != null)
                {
                    _dbSet.Remove(user);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning("Attempt to delete non-existent user with id: {Id}", id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user with id: {Id}", id);
                throw;
            }
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            try
            {
                return await _dbSet.AnyAsync(u => u.Email == email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking user existence by email: {Email}", email);
                throw;
            }
        }

        public async Task<User?> GetByResetTokenAsync(string token)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(u =>
                    u.PasswordResetToken == token && u.PasswordResetExpires > DateTime.UtcNow);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by password reset token");
                throw;
            }
        }
    }
}

