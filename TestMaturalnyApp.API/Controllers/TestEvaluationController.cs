using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/test-evaluation")]
    public class TestEvaluationController : ControllerBase
    {
        private readonly ITestEvaluationService _evaluationService;
        private readonly ILogger<TestEvaluationController> _logger;

        public TestEvaluationController(
            ITestEvaluationService evaluationService,
            ILogger<TestEvaluationController> logger)
        {
            _evaluationService = evaluationService;
            _logger = logger;
        }

        [HttpPost("evaluate")]
        public async Task<ActionResult<TestEvaluationResultDto>> Evaluate([FromBody] EvaluateTestRequestDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid model state for evaluation request");
                    return BadRequest(ModelState);
                }

                var result = await _evaluationService.EvaluateAsync(dto);

                _logger.LogInformation("Test evaluated successfully for request {@Request}", dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while evaluating test for request {@Request}", dto);
                return StatusCode(500, "An error occurred while evaluating the test.");
            }
        }
    }
}
