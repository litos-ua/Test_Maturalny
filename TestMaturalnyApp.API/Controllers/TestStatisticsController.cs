
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/statistics")]
    public class TestStatisticsController : ControllerBase
    {
        private readonly ITestStatisticsService _statisticsService;
        private readonly ILogger<TestStatisticsController> _logger;

        public TestStatisticsController(
            ITestStatisticsService statisticsService,
            ILogger<TestStatisticsController> logger)
        {
            _statisticsService = statisticsService;
            _logger = logger;
        }

        [HttpGet("user-session/{userId}")]
        public async Task<ActionResult> GetUserSessions(int userId, int? page = null, int? pageSize = null)
        {
            try
            {
                _logger.LogInformation("Getting sessions for user {UserId} with page {Page}, pageSize {PageSize}",
                    userId, page, pageSize);

                // Валидация параметров пагинации
                if (pageSize.HasValue)
                {
                    pageSize = Math.Min(pageSize.Value, 100);
                    _logger.LogDebug("Adjusted pageSize to {AdjustedPageSize}", pageSize);
                }

                if (page.HasValue && pageSize.HasValue)
                {
                    var pagedResult = await _statisticsService.GetUserCompletedSessionsAsync(userId, page.Value, pageSize.Value);
                    _logger.LogDebug("Returning paged result for user {UserId} - {Count} items",
                        userId, pagedResult.Items?.Count());
                    return Ok(pagedResult);
                }
                else
                {
                    var fullList = await _statisticsService.GetUserCompletedSessionsAsync(userId);
                    _logger.LogDebug("Returning full list for user {UserId} - {Count} items",
                        userId, fullList?.Count());
                    return Ok(fullList);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting sessions for user {UserId}", userId);
                return StatusCode(500, $"An error occurred while getting sessions for user {userId}");
            }
        }

        [HttpGet("user-session/evaluation_details/{sessionId}")]
        public async Task<ActionResult<IEnumerable<TestSessionQuestionDetailDto>>> GetSessionDetails(int sessionId)
        {
            try
            {
                _logger.LogInformation("Getting session details for session {SessionId}", sessionId);

                var details = await _statisticsService.GetSessionDetailsAsync(sessionId);

                if (details == null || !details.Any())
                {
                    _logger.LogWarning("No details found for session {SessionId}", sessionId);
                    return NotFound($"No details found for session {sessionId}");
                }

                _logger.LogDebug("Returning {Count} details for session {SessionId}",
                    details.Count(), sessionId);
                return Ok(details);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting details for session {SessionId}", sessionId);
                return StatusCode(500, $"An error occurred while getting details for session {sessionId}");
            }
        }
    }
}
