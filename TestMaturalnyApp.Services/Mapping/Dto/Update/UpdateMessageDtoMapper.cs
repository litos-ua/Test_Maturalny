using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateMessageDtoMapper
    {
        public static Message MapToEntity(UpdateMessageDto dto, int senderId)
        {
            return new Message
            {
                Id = dto.Id,
                SenderId = senderId,
                ReceiverId = dto.ReceiverId,
                Content = dto.Content,
                SentAt = DateTime.UtcNow
            };
        }

        internal static void MapToEntity(UpdateMessageDto dto, Message message)
        {
            throw new NotImplementedException();
        }
    }
}
