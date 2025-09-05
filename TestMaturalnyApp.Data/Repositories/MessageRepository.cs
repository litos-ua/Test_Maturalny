using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;

        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Message?> GetByIdAsync(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<IEnumerable<Message>> GetConversationAsync(int userId1, int userId2)
        {
            return await _context.Messages
                .Where(m => (m.SenderId == userId1 && m.ReceiverId == userId2) ||
                            (m.SenderId == userId2 && m.ReceiverId == userId1))
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Message>> GetInboxAsync(int userId)
        {
            return await _context.Messages
                .Where(m => m.ReceiverId == userId)
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<PagedResult<Message>> GetConversationPagedAsync(
            int userId1, int userId2,
            int pageNumber, int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            IQueryable<Message> query = _context.Messages
                .Where(m =>
                    (m.SenderId == userId1 && m.ReceiverId == userId2) ||
                    (m.SenderId == userId2 && m.ReceiverId == userId1));

            // Фильтрация
            if (!string.IsNullOrWhiteSpace(filter))
                query = query.Where(m => m.Content.Contains(filter));

            // Сортировка
            bool isDesc = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);
            query = sortBy?.ToLower() switch
            {
                "id" => isDesc ? query.OrderByDescending(m => m.Id) : query.OrderBy(m => m.Id),
                "sentat" => isDesc ? query.OrderByDescending(m => m.SentAt) : query.OrderBy(m => m.SentAt),
                _ => query.OrderByDescending(m => m.SentAt) // по умолчанию — новые сверху
            };

            int totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Message>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<PagedResult<Message>> GetInboxPagedAsync(
            int userId, int pageNumber, int pageSize,
            string? filter = null, string? sortBy = null, string? sortOrder = null)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            IQueryable<Message> query = _context.Messages.Where(m => m.ReceiverId == userId);

            if (!string.IsNullOrWhiteSpace(filter))
                query = query.Where(m => m.Content.Contains(filter));

            bool isDesc = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);
            query = sortBy?.ToLower() switch
            {
                "id" => isDesc ? query.OrderByDescending(m => m.Id) : query.OrderBy(m => m.Id),
                "sentat" => isDesc ? query.OrderByDescending(m => m.SentAt) : query.OrderBy(m => m.SentAt),
                _ => query.OrderByDescending(m => m.SentAt)
            };

            int totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Message>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task CreateAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
        }

        public async Task UpdateAsync(Message message)
        {
            _context.Messages.Update(message);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Message message)
        {
            _context.Messages.Remove(message);
            await Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
