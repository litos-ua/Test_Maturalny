
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories
{
    public class DisciplineRepository : IDisciplineRepository, IDisciplineAdminRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DisciplineRepository> _logger;

        public DisciplineRepository(AppDbContext context, ILogger<DisciplineRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Discipline>> GetAllAsync()
        {
            try
            {
                return await _context.Disciplines.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all disciplines.");
                throw;
            }
        }

        public async Task<PagedResult<Discipline>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null)
        {
            try
            {
                if (pageNumber <= 0) pageNumber = 1;
                if (pageSize <= 0) pageSize = 10;

                IQueryable<Discipline> query = _context.Disciplines;

                // Фильтрация
                if (!string.IsNullOrWhiteSpace(filter))
                {
                    query = query.Where(d => d.Name.Contains(filter));
                }

                // Сортировка
                if (!string.IsNullOrWhiteSpace(sortBy))
                {
                    bool isDesc = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);

                    query = sortBy.ToLower() switch
                    {
                        "id" => isDesc ? query.OrderByDescending(d => d.Id) : query.OrderBy(d => d.Id),
                        "name" => isDesc ? query.OrderByDescending(d => d.Name) : query.OrderBy(d => d.Name),
                        _ => query.OrderBy(d => d.Name) 
                    };
                }
                else
                {
                    query = query.OrderBy(d => d.Name); 
                }

                int totalCount = await query.CountAsync();

                var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return new PagedResult<Discipline>
                {
                    Items = items,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting paged disciplines.");
                throw new Exception("An error occurred while retrieving paged disciplines.", ex);
            }
        }


        public async Task<Discipline?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Disciplines.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting discipline by id: {Id}", id);
                throw;
            }
        }

        public async Task<Discipline> CreateAsync(Discipline entity)
        {
            try
            {
                _context.Disciplines.Add(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating discipline.");
                throw;
            }
        }

        public async Task<Discipline> UpdateAsync(Discipline entity)
        {
            try
            {
                _context.Disciplines.Update(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating discipline with id: {Id}", entity.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var entity = await _context.Disciplines.FindAsync(id);
                if (entity == null)
                {
                    _logger.LogWarning("Attempt to delete non-existent discipline with id: {Id}", id);
                    return false;
                }

                _context.Disciplines.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting discipline with id: {Id}", id);
                throw;
            }
        }
    }
}


