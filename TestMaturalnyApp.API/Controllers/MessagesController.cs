using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly ICurrentUserService _currentUserService;
        private readonly ILogger<MessagesController> _logger;

        public MessagesController(
            IMessageService messageService,
            ICurrentUserService currentUserService,
            ILogger<MessagesController> logger)
        {
            _messageService = messageService;
            _currentUserService = currentUserService;
            _logger = logger;
        }

        /// <summary>
        /// Отправить сообщение
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] CreateMessageDto dto)
        {
            try
            {
                var senderId = _currentUserService.UserId;
                if (!senderId.HasValue) return Unauthorized("User is not authorized");

                var message = await _messageService.SendMessageAsync(dto, senderId.Value);
                return Ok(message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending message");
                return StatusCode(500, "Server error sending message");
            }
        }

        /// <summary>
        /// Получить все сообщения между двумя пользователями
        /// </summary>
        [HttpGet("conversation/{userId}")]
        public async Task<IActionResult> GetConversation(int userId)
        {
            try
            {
                var currentUserId = _currentUserService.UserId;
                if (!currentUserId.HasValue) return Unauthorized("User is not authorized");

                var messages = await _messageService.GetConversationAsync(currentUserId.Value, userId);
                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while receiving dialog with user {UserId}", userId);
                return StatusCode(500, "Server error reciving dilog");
            }
        }

        /// <summary>
        /// Получить входящие сообщения
        /// </summary>
        [HttpGet("inbox")]
        public async Task<IActionResult> GetInbox()
        {
            try
            {
                var userId = _currentUserService.UserId;
                if (!userId.HasValue) return Unauthorized("User is not authorized");

                var messages = await _messageService.GetInboxAsync(userId.Value);
                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error receiving incoming messages");
                return StatusCode(500, "Server error receiving incoming messages");
            }
        }

        /// <summary>
        /// Получить диалог с пагинацией
        /// </summary>
        [HttpGet("conversation/{userId}/paged")]
        public async Task<IActionResult> GetConversationPaged(
            int userId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? filter = null,
            [FromQuery] string? sortBy = null,
            [FromQuery] string? sortOrder = null)
        {
            try
            {
                var currentUserId = _currentUserService.UserId;
                if (!currentUserId.HasValue) return Unauthorized("User is not authorized");

                var result = await _messageService.GetConversationPagedAsync(
                    currentUserId.Value, userId, page, pageSize, filter, sortBy, sortOrder);

                Response.Headers["X-Total-Count"] = result.TotalCount.ToString();
                return Ok(result.Items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting paginated dialog with user {UserId}", userId);
                return StatusCode(500, "Error receiving dilog");
            }
        }

        /// <summary>
        /// Получить входящие сообщения с пагинацией
        /// </summary>
        [HttpGet("inbox/paged")]
        public async Task<IActionResult> GetInboxPaged(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? filter = null,
            [FromQuery] string? sortBy = null,
            [FromQuery] string? sortOrder = null)
        {
            try
            {
                var userId = _currentUserService.UserId;
                if (!userId.HasValue) return Unauthorized("User is not authorized");

                var result = await _messageService.GetInboxPagedAsync(
                    userId.Value, page, pageSize, filter, sortBy, sortOrder);

                Response.Headers["X-Total-Count"] = result.TotalCount.ToString();
                return Ok(result.Items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error receiving incoming messages (with pagination)");
                return StatusCode(500, "Server error receiving incoming messages");
            }
        }

        /// <summary>
        /// Создать сообщение (аналог SendMessage, но под CreateDto)
        /// </summary>
        [HttpPost("create")]
        public async Task<IActionResult> CreateMessage([FromBody] CreateMessageDto dto)
        {
            try
            {
                var currentUserId = _currentUserService.UserId;
                if (!currentUserId.HasValue) return Unauthorized("User is not authorized");

                var message = await _messageService.CreateMessageAsync(dto, currentUserId.Value);
                return Ok(message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating messages");
                return StatusCode(500, "Server error creating messages");
            }
        }

        /// <summary>
        /// Обновить сообщение (может только автор)
        /// </summary>
        [HttpPut("{messageId}")]
        public async Task<IActionResult> UpdateMessage(int messageId, [FromBody] UpdateMessageDto dto)
        {
            try
            {
                var currentUserId = _currentUserService.UserId;
                if (!currentUserId.HasValue) return Unauthorized("User is not authorized");

                var updated = await _messageService.UpdateMessageAsync(dto, messageId, currentUserId.Value);
                if (updated == null) return NotFound("Message not found or access denied");

                return Ok(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating messages {MessageId}", messageId);
                return StatusCode(500, "Srror updating messages");
            }
        }

        /// <summary>
        /// Удалить сообщение
        /// </summary>
        [HttpDelete("{messageId}")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {
            try
            {
                var currentUserId = _currentUserService.UserId;
                if (!currentUserId.HasValue) return Unauthorized("User is not authorized");

                var success = await _messageService.DeleteMessageAsync(messageId, currentUserId.Value);
                if (!success) return NotFound("Message not found or access denied");

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting messages {MessageId}", messageId);
                return StatusCode(500, "Error deleting messages");
            }
        }

        /// <summary>
        /// Пометить сообщение как прочитанное
        /// </summary>
        [HttpPut("{messageId}/read")]
        public async Task<IActionResult> MarkAsRead(int messageId)
        {
            try
            {
                var currentUserId = _currentUserService.UserId;
                if (!currentUserId.HasValue) return Unauthorized("User is not authorized");

                var success = await _messageService.MarkAsReadAsync(messageId, currentUserId.Value);
                if (!success) return NotFound("Message not found or access denied");

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error marking message {MessageId} as read", messageId);
                return StatusCode(500, "Server error when marking as read");
            }
        }
    }
}

