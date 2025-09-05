
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories
{
    public class TopicRepository : ITopicRepository, ITopicAdminRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TopicRepository> _logger;

        public TopicRepository(AppDbContext context, ILogger<TopicRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Topic>> GetAllAsync()
        {
            try
            {
                return await _context.Topics.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting all disciplines (subjects)");
                throw;
            }
        }

        // Для админ

        public async Task<PagedResult<Topic>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortField,
            string? sortOrder,
            int? disciplineId
)
        {
            try
            {
                var query = _context.Topics.AsQueryable();

                // Фильтрация
                if (disciplineId.HasValue)
                {
                    query = query.Where(t => t.DisciplineId == disciplineId.Value);
                }

                // Сортировка
                if (!string.IsNullOrEmpty(sortField))
                {
                    bool descending = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);

                    if (typeof(Topic).GetProperty(sortField) == null)
                        throw new ArgumentException($"Свойство {sortField} не найдено в Topic");

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

                return new PagedResult<Topic>
                {
                    Items = items,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] {ex}");
                throw;
            }
        }




        public async Task<Topic?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Topics.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting topic (item) by id: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<Topic>> GetByDisciplineIdAsync(int disciplineId)
        {
            try
            {
                return await _context.Topics
                    .Where(t => t.DisciplineId == disciplineId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting topics (subjects) by disciplineId {DisciplineId}", disciplineId);
                throw;
            }
        }

        public async Task<Topic> CreateAsync(Topic topic)
        {
            try
            {
                _context.Topics.Add(topic);
                await _context.SaveChangesAsync();
                return topic;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating topic (item)");
                throw;
            }
        }

        public async Task<Topic> UpdateAsync(Topic topic)
        {
            try
            {
                var existing = await _context.Topics.FirstOrDefaultAsync(t => t.Id == topic.Id);
                if (existing == null)
                    throw new KeyNotFoundException($"Topic with id {topic.Id} not found");

                // Обновляем поля
                existing.Title = topic.Title;
                existing.Description = topic.Description;
                existing.Level = topic.Level;
                existing.UpdatedAt = DateTime.UtcNow;
                existing.DisciplineId = topic.DisciplineId;

                await _context.SaveChangesAsync();
                return existing;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating topic (item) with id: {Id}", topic.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var topic = await _context.Topics.FindAsync(id);
                if (topic == null)
                {
                    _logger.LogWarning("Attempt to delete non-existent topic (item) with id: {Id}", id);
                    return false;
                }

                _context.Topics.Remove(topic);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting topic (item) with id: {Id}", id);
                throw;
            }
        }
    }

}
