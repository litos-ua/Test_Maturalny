using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Interfaces.AI;

namespace TestMaturalnyApp.API.Controllers.AI
{
    [ApiController]
    [Route("api/ai/[controller]")]
    //[Authorize]
    public class ExplanationsController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IAiExplanationService _aiExplanationService;
        private readonly ILogger<ExplanationsController> _logger;

        public ExplanationsController(
            IQuestionService questionService,
            IAiExplanationService aiExplanationService,
            ILogger<ExplanationsController> logger)
        {
            _questionService = questionService;
            _aiExplanationService = aiExplanationService;
            _logger = logger;
        }

        /// <summary>
        /// Получить AI-пояснение для вопроса (учебный режим)
        /// GET: api/ai/explanations/question/5
        /// </summary>
        [HttpGet("question/{questionId}")]
        public async Task<IActionResult> GetExplanation(int questionId)
        {
            try
            {
                // Получаем вопрос с опциями из существующего сервиса
                var question = await _questionService.GetByIdWithOptionsAsync(questionId);

                if (question == null)
                {
                    return NotFound(new { error = "Question not found" });
                }

                // Находим правильный ответ
                var correctAnswer = question.Options.FirstOrDefault(o => o.IsCorrect);

                if (correctAnswer == null)
                {
                    return NotFound(new { error = "Correct answer not found" });
                }

                // Генерируем пояснение
                var explanation = await _aiExplanationService.GenerateExplanationAsync(
                    questionText: question.Text,
                    correctAnswer: correctAnswer.Text,
                    questionType: question.Type.ToString()
                );

                return Ok(new
                {
                    questionId = questionId,
                    correctAnswerText = correctAnswer.Text,
                    explanation = explanation,
                    generatedAt = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting AI explanation for question {QuestionId}", questionId);
                return StatusCode(500, new { error = "Failed to generate explanation" });
            }
        }
    }
}
