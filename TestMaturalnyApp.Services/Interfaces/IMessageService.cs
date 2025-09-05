using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IMessageService
    {
        Task<MessageDto> SendMessageAsync(CreateMessageDto dto, int senderId);
        Task<IEnumerable<MessageDto>> GetConversationAsync(int userId1, int userId2);
        Task<IEnumerable<MessageDto>> GetInboxAsync(int userId);
        Task<PagedResult<MessageDto>> GetConversationPagedAsync(
            int userId1, int userId2,
            int pageNumber, int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null);

        Task<PagedResult<MessageDto>> GetInboxPagedAsync(
            int userId, int pageNumber, int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null);
        Task<MessageDto> CreateMessageAsync(CreateMessageDto createDto, int currentUserId);
        Task<MessageDto?> UpdateMessageAsync(UpdateMessageDto dto, int messageId, int currentUserId);
        Task<bool> DeleteMessageAsync(int messageId, int userId);
        Task<bool> MarkAsReadAsync(int messageId, int userId);
    }
}
