using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface IMessageRepository
    {
        Task<Message?> GetByIdAsync(int id);
        Task<IEnumerable<Message>> GetConversationAsync(int userId1, int userId2);
        Task<IEnumerable<Message>> GetInboxAsync(int userId);
        Task<PagedResult<Message>> GetConversationPagedAsync(
            int userId1, int userId2,
            int pageNumber, int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null);

        Task<PagedResult<Message>> GetInboxPagedAsync(
            int userId,
            int pageNumber, int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null);
        Task CreateAsync(Message message);
        Task UpdateAsync(Message message);
        Task DeleteAsync(Message message);
        Task SaveChangesAsync();
    }
}
