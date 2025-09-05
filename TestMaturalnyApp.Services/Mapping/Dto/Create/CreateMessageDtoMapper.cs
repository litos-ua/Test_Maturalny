using System;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateMessageDtoMapper
    {
        public static Message MapToEntity(CreateMessageDto dto, int senderId)
        {
            return new Message
            {
                SenderId = senderId,
                ReceiverId = dto.ReceiverId,
                Content = dto.Content,
                SentAt = DateTime.UtcNow
            };
        }
    }
}
