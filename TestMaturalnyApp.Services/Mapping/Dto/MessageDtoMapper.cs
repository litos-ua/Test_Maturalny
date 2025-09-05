using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class MessageDtoMapper
    {
        public static MessageDto MapToDto(Message message, User sender, User receiver)
        {
            return new MessageDto
            {
                Id = message.Id,
                SenderId = message.SenderId,
                SenderName = sender.Fullname ?? sender.Username,
                ReceiverId = message.ReceiverId,
                ReceiverName = receiver.Fullname ?? receiver.Username,
                Content = message.Content,
                SentAt = message.SentAt,
                ReadAt = message.ReadAt
            };
        }
    }
}
