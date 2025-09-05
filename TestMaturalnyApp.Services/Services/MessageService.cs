using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Helpers;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;

        public MessageService(IMessageRepository messageRepository, IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }

        public async Task<MessageDto> SendMessageAsync(CreateMessageDto dto, int senderId)
        {
            var message = CreateMessageDtoMapper.MapToEntity(dto, senderId);

            await _messageRepository.CreateAsync(message);
            await _messageRepository.SaveChangesAsync();

            var sender = await _userRepository.GetByIdAsync(senderId);
            var receiver = await _userRepository.GetByIdAsync(dto.ReceiverId);

            return MessageDtoMapper.MapToDto(message, sender!, receiver!);
        }

        public async Task<IEnumerable<MessageDto>> GetConversationAsync(int userId1, int userId2)
        {
            var messages = await _messageRepository.GetConversationAsync(userId1, userId2);

            var sender = await _userRepository.GetByIdAsync(userId1);
            var receiver = await _userRepository.GetByIdAsync(userId2);

            return messages.Select(m =>
                MessageDtoMapper.MapToDto(
                    m,
                    m.SenderId == userId1 ? sender! : receiver!,
                    m.SenderId == userId1 ? receiver! : sender!
                )
            );
        }

        public async Task<IEnumerable<MessageDto>> GetInboxAsync(int userId)
        {
            var messages = await _messageRepository.GetInboxAsync(userId);
            var user = await _userRepository.GetByIdAsync(userId);

            var result = new List<MessageDto>();
            foreach (var message in messages)
            {
                var sender = await _userRepository.GetByIdAsync(message.SenderId);
                result.Add(MessageDtoMapper.MapToDto(message, sender!, user!));
            }

            return result;
        }

        public async Task<PagedResult<MessageDto>> GetConversationPagedAsync(
            int userId1, int userId2,
            int pageNumber, int pageSize,
            string? filter = null, string? sortBy = null, string? sortOrder = null)
        {
            var dataPaged = await _messageRepository.GetConversationPagedAsync(
                userId1, userId2, pageNumber, pageSize, filter, sortBy, sortOrder);

            var sender = await _userRepository.GetByIdAsync(userId1);
            var receiver = await _userRepository.GetByIdAsync(userId2);

            return new PagedResult<MessageDto>
            {
                Items = dataPaged.Items.Select(m =>
                    MessageDtoMapper.MapToDto(m,
                        m.SenderId == userId1 ? sender! : receiver!,
                        m.SenderId == userId1 ? receiver! : sender!)
                ).ToList(),
                TotalCount = dataPaged.TotalCount,
                PageNumber = dataPaged.PageNumber,
                PageSize = dataPaged.PageSize
            };
        }

        public async Task<PagedResult<MessageDto>> GetInboxPagedAsync(
            int userId, int pageNumber, int pageSize,
            string? filter = null, string? sortBy = null, string? sortOrder = null)
        {
            var dataPaged = await _messageRepository.GetInboxPagedAsync(userId, pageNumber, pageSize, filter, sortBy, sortOrder);

            var user = await _userRepository.GetByIdAsync(userId);

            var items = new List<MessageDto>();
            foreach (var m in dataPaged.Items)
            {
                var sender = await _userRepository.GetByIdAsync(m.SenderId);
                items.Add(MessageDtoMapper.MapToDto(m, sender!, user!));
            }

            return new PagedResult<MessageDto>
            {
                Items = items,
                TotalCount = dataPaged.TotalCount,
                PageNumber = dataPaged.PageNumber,
                PageSize = dataPaged.PageSize
            };
        }


        public async Task<MessageDto> CreateMessageAsync(CreateMessageDto createDto, int currentUserId)
        {
            var sender = await _userRepository.GetByIdAsync(currentUserId);
            var receiver = await _userRepository.GetByIdAsync(createDto.ReceiverId);

            if (sender == null || receiver == null)
                throw new InvalidOperationException("Пользователь не найден.");

            if (!MessagePermissionsHelper.CanSend(sender.Role, receiver.Role))
                throw new UnauthorizedAccessException("Недостаточно прав для отправки сообщения.");

            // Тут создаём сущность из DTO
            var entity = CreateMessageDtoMapper.MapToEntity(createDto, currentUserId);

            await _messageRepository.CreateAsync(entity);
            await _messageRepository.SaveChangesAsync();

            // Возвращаем DTO
            return MessageDtoMapper.MapToDto(entity, sender, receiver);
        }



        public async Task<MessageDto?> UpdateMessageAsync(UpdateMessageDto dto, int messageId, int currentUserId)
        {
            var message = await _messageRepository.GetByIdAsync(messageId);
            if (message == null || message.SenderId != currentUserId)
                return null;

            UpdateMessageDtoMapper.MapToEntity(dto, message);
            await _messageRepository.UpdateAsync(message);
            await _messageRepository.SaveChangesAsync();

            var sender = await _userRepository.GetByIdAsync(message.SenderId);
            var receiver = await _userRepository.GetByIdAsync(message.ReceiverId);

            return MessageDtoMapper.MapToDto(message, sender!, receiver!);
        }

        public async Task<bool> DeleteMessageAsync(int messageId, int userId)
        {
            var message = await _messageRepository.GetByIdAsync(messageId);
            if (message == null || (message.SenderId != userId && message.ReceiverId != userId))
                return false;

            await _messageRepository.DeleteAsync(message);
            await _messageRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> MarkAsReadAsync(int messageId, int userId)
        {
            var message = await _messageRepository.GetByIdAsync(messageId);
            if (message == null || message.ReceiverId != userId)
                return false;

            message.ReadAt = DateTime.UtcNow;
            await _messageRepository.UpdateAsync(message);
            await _messageRepository.SaveChangesAsync();

            return true;
        }
    }
}
