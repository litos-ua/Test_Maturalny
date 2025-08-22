//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using TestMaturalnyApp.Data.Entities;
//using TestMaturalnyApp.Data.Interfaces.Admin;
//using TestMaturalnyApp.Domain.Models;

//namespace TestMaturalnyApp.Data.Repositories.Admin
//{
//    public class AnswerOptionAdminRepository : IAnswerOptionAdminRepository
//    {
//        private readonly AppDbContext _context;

//        public AnswerOptionAdminRepository(AppDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<PagedResult<AnswerOption>> GetPagedAsync(int pageNumber, int pageSize, string? filterTerm, string? sortField, string? sortOrder)
//        {
//            var query = _context.AnswerOptions.AsQueryable();

//            if (!string.IsNullOrWhiteSpace(filterTerm))
//                query = query.Where(a => a.Text.Contains(filterTerm));

//            if (!string.IsNullOrEmpty(sortField))
//            {
//                var propInfo = typeof(Topic).GetProperty(sortField);
//                if (propInfo == null)
//                    throw new ArgumentException($"Свойство {sortField} не найдено в Topic");

//                bool descending = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);

//                var propertyType = propInfo.PropertyType;

//                query = descending
//                    ? query.OrderByDescending(e => EF.Property<object>(e, sortField))
//                    : query.OrderBy(e => EF.Property<object>(e, sortField));
//            }
//            else
//            {
//                query = query.OrderBy(t => t.Id);
//            }



//            var totalCount = await query.CountAsync();

//            var items = await query
//                .Skip((pageNumber - 1) * pageSize)
//                .Take(pageSize)
//                .ToListAsync();

//            return new PagedResult<AnswerOption>
//            {
//                Items = items,
//                TotalCount = totalCount,
//                PageNumber = pageNumber,
//                PageSize = pageSize
//            };
//        }

//        public async Task<AnswerOption?> GetByIdAsync(int id) => await _context.AnswerOptions.FindAsync(id);

//        public async Task<AnswerOption> CreateAsync(AnswerOption entity)
//        {
//            _context.AnswerOptions.Add(entity);
//            await _context.SaveChangesAsync();
//            return entity;
//        }

//        public async Task<AnswerOption?> UpdateAsync(AnswerOption entity)
//        {
//            var existing = await _context.AnswerOptions.FindAsync(entity.Id);
//            if (existing == null) return null;

//            _context.Entry(existing).CurrentValues.SetValues(entity);
//            await _context.SaveChangesAsync();
//            return existing;
//        }

//        public async Task<bool> DeleteAsync(int id)
//        {
//            var existing = await _context.AnswerOptions.FindAsync(id);
//            if (existing == null) return false;
//            _context.AnswerOptions.Remove(existing);
//            await _context.SaveChangesAsync();
//            return true;
//        }
//    }

//}


using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories.Admin
{
    public class AnswerOptionAdminRepository : IAnswerOptionAdminRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AnswerOptionAdminRepository> _logger;

        public AnswerOptionAdminRepository(AppDbContext context, ILogger<AnswerOptionAdminRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<PagedResult<AnswerOption>> GetPagedAsync(
            int pageNumber, int pageSize, string? filterTerm, string? sortField, string? sortOrder)
        {
            try
            {
                var query = _context.AnswerOptions.AsQueryable();

                if (!string.IsNullOrWhiteSpace(filterTerm))
                    query = query.Where(a => a.Text.Contains(filterTerm));

                if (!string.IsNullOrEmpty(sortField))
                {
                    var propInfo = typeof(AnswerOption).GetProperty(sortField);
                    if (propInfo == null)
                        throw new ArgumentException($"Свойство {sortField} не найдено в {nameof(AnswerOption)}");

                    bool descending = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);

                    query = descending
                        ? query.OrderByDescending(e => EF.Property<object>(e, sortField))
                        : query.OrderBy(e => EF.Property<object>(e, sortField));
                }
                else
                {
                    query = query.OrderBy(t => t.Id);
                }

                var totalCount = await query.CountAsync();

                var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return new PagedResult<AnswerOption>
                {
                    Items = items,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении страницы AnswerOption");
                throw;
            }
        }

        public async Task<IEnumerable<AnswerOption>> GetManyAsync(IEnumerable<int> ids)
        {
            try
            {
                return await _context.AnswerOptions
                    .Where(a => ids.Contains(a.Id))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении множества AnswerOption по Id");
                throw;
            }
        }

        public async Task<AnswerOption?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.AnswerOptions.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении AnswerOption с Id={Id}", id);
                throw;
            }
        }

        public async Task<AnswerOption> CreateAsync(AnswerOption entity)
        {
            try
            {
                _context.AnswerOptions.Add(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при создании AnswerOption");
                throw;
            }
        }

        public async Task<AnswerOption?> UpdateAsync(AnswerOption entity)
        {
            try
            {
                var existing = await _context.AnswerOptions.FindAsync(entity.Id);
                if (existing == null) return null;

                _context.Entry(existing).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
                return existing;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении AnswerOption с Id={Id}", entity.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var existing = await _context.AnswerOptions.FindAsync(id);
                if (existing == null) return false;

                _context.AnswerOptions.Remove(existing);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении AnswerOption с Id={Id}", id);
                throw;
            }
        }
    }
}
