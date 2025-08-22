using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/export")]
    public class TestExportController : ControllerBase
    {
        private readonly ITestExportService _exportService;
        private readonly ILogger<TestExportController> _logger;

        public TestExportController(
            ITestExportService exportService,
            ILogger<TestExportController> logger)
        {
            _exportService = exportService;
            _logger = logger;
        }

        [HttpGet("session/{sessionId}")]
        public async Task<ActionResult<TestExportDto>> ExportSession(int sessionId)
        {
            try
            {
                _logger.LogInformation("Starting export for session {SessionId}", sessionId);

                var export = await _exportService.ExportSessionAsync(sessionId);

                if (export == null)
                {
                    _logger.LogWarning("Export data not found for session {SessionId}", sessionId);
                    return NotFound($"Export data not found for session {sessionId}");
                }

                _logger.LogInformation("Successfully exported session {SessionId}", sessionId);
                return Ok(export);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while exporting session {SessionId}", sessionId);
                return StatusCode(500, $"An error occurred while exporting session {sessionId}");
            }
        }
    }
}