
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Services.Interfaces;


namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Teacher,Student")]
    public class TestSessionController : ControllerBase
    {
        private readonly ITestSessionService _testSessionService;
        private readonly IUserAnswerService _userAnswerService;
        private readonly ITestEvaluationService _testEvaluationService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IQuestionService _questionService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<TestExportController> _logger;

        public TestSessionController
            (
            ITestSessionService testSessionService,
            IUserAnswerService userAnswerService,
            ITestEvaluationService testEvaluationService,
            ICurrentUserService currentUserService,
            IQuestionService questionService,
            IConfiguration configuration,
            ILogger<TestExportController> logger
            )
        {
            _testSessionService = testSessionService;
            _userAnswerService = userAnswerService;
            _testEvaluationService = testEvaluationService;
            _currentUserService = currentUserService;
            _questionService = questionService;
            _configuration = configuration;
            _logger = logger;
        }

        /// <summary>
        /// Создание новой сессии тестирования.
        /// </summary>
        [HttpPost("start")]
        public async Task<IActionResult> StartSession([FromBody] CreateTestSessionDto dto)
        {
            try
            {
                _logger.LogInformation("Starting new test session for user {UserId}", dto.UserId);
                var createdSession = await _testSessionService.StartSessionAsync(dto);

                _logger.LogInformation("Test session {SessionId} created successfully", createdSession.Id);
                return CreatedAtAction(nameof(GetById), new { id = createdSession.Id }, createdSession);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while starting test session for user {UserId}", dto?.UserId);
                return StatusCode(500, "An error occurred while starting test session");
            }
        }

        /// <summary>
        /// Получение сессии по ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                _logger.LogDebug("Fetching test session {SessionId}", id);
                var session = await _testSessionService.GetByIdAsync(id);

                if (session == null)
                {
                    _logger.LogWarning("Test session {SessionId} not found", id);
                    return NotFound();
                }

                _logger.LogDebug("Successfully retrieved test session {SessionId}", id);
                return Ok(session);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching test session {SessionId}", id);
                return StatusCode(500, $"An error occurred while fetching test session {id}");
            }
        }

        /// <summary>
        /// Создание сессии тестирования.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<TestSessionDto>> CreateSession([FromBody] CreateTestSessionDto dto)
        {
            try
            {
                _logger.LogInformation("Creating new test session for user {UserId}", dto.UserId);
                var result = await _testSessionService.CreateAsync(dto);

                _logger.LogInformation("Test session {SessionId} created successfully", result.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating test session for user {UserId}", dto?.UserId);
                return StatusCode(500, "An error occurred while creating test session");
            }
        }

        /// <summary>
        /// Получение всех сессий пользователя.
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            try
            {
                _logger.LogInformation("Fetching test sessions for user {UserId}", userId);
                var sessions = await _testSessionService.GetByUserIdAsync(userId);

                _logger.LogDebug("Found {SessionCount} sessions for user {UserId}", sessions.Count(), userId);
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while fetching test sessions for user {UserId}", userId);
                return StatusCode(500, $"An error occurred while fetching sessions for user {userId}");
            }
        }

        /// <summary>
        /// Получение вопросов и создание новой сессии тестирования
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>

        [HttpPost("exam/start")]
        [Authorize]
        public async Task<IActionResult> StartExamSession([FromBody] StartExamRequestDto request)
        {
            try
            {
                // Получаем id текущего аутентифицированного пользователя
                var userId = _currentUserService.UserId;

                if (userId == null)
                    return Unauthorized();

                // ✅ Сравнение — пользователь не должен подделывать userId
                if (request.UserId != userId)
                    return Unauthorized("User ID in request does not match the authenticated user.");

                // ✅ Получаем лимит времени с сервера
                int requestTimeLimitSeconds = request.TimeLimitSeconds ?? 3600;
                int configTimeLimit = _configuration.GetValue<int>("TestSessionSettings:TimeLimitSeconds", requestTimeLimitSeconds);

                // Проверка совпадения (можно логировать или бросать ошибку, если нужно)
                if (request.TimeLimitSeconds != configTimeLimit)
                {
                    Console.WriteLine("⚠ Время из UI отличается от серверного конфигурационного значения.");
                    // Можно вернуть BadRequest или просто игнорировать и продолжать с configTimeLimit
                }


                // ✅ Создаем перемешанную сессию и вопросы
                int totalCount = _configuration.GetValue<int>("QuestionSettings:NumberOfTestQuestions", 30);

                // var result = await _questionService.CreateRandomRealTestAsync(
                var result = await _testSessionService.CreateRandomRealTestAsync(
                    request.DisciplineId,
                    totalCount,
                    userId.Value,
                    configTimeLimit,
                    request.Description
                );

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error starting test session: {ex.Message}");
                return StatusCode(500, "Error starting test session.");
            }
        }


        /// <summary>
        /// Завершение сессии тестирования.
        /// </summary>
        public class CompleteTestSessionRequest
        {
            public SessionEndReason Reason { get; set; }
            public List<CreateUserAnswerDto> Answers { get; set; } = new();
        }


        [HttpPost("end/{sessionId}")]
        public async Task<IActionResult> EndSession(int sessionId, [FromBody] CompleteTestSessionRequest request)
        {
            if (request.Answers == null || !request.Answers.Any())
                return BadRequest("There are no answers");

            try
            {
                // 1. Получаем сессию
                var session = await _testSessionService.GetByIdAsync(sessionId);
                if (session == null)
                    return NotFound("Test session not found");

                // 2. Проверяем превышение времени
                var endTime = DateTime.UtcNow;
                var duration = endTime - session.StartedAt;

                // Ограничение по времени из serverconfig.json
                int serverLimitSeconds = _configuration.GetValue<int>("TestSessionSettings:TimeLimitSeconds", 3600);
                var allowedLimit = TimeSpan.FromSeconds(serverLimitSeconds + 300); // 5 минут допуск

                if (duration > allowedLimit)
                {
                    // Завершаем сессию без оценки
                    await _testSessionService.EndSessionAsync(sessionId, SessionEndReason.Timeout);
                    return BadRequest("Maximum testing time exceeded.");
                }

                // 3. Оценка
                var evaluationResult = await _testEvaluationService.EvaluateShuffleAsync(new EvaluateTestRequestDto
                {
                    TestSessionId = sessionId,
                    Answers = request.Answers
                        .GroupBy(a => a.QuestionId)
                        .ToDictionary(
                            g => g.Key,
                            g => g.SelectMany(a => a.SelectedOptionIds).ToList()
                        )
                });

                // ✅ ВСТАВЛЯЕМ Score из оценки
                int counter = 1;
                int internalCount;
                foreach (var answer in request.Answers)
                {
                    internalCount = counter++;
                    var result = evaluationResult.Results.FirstOrDefault(r => r.QuestionId == answer.QuestionId);
                    if (result != null)
                    {
                        answer.Score = result.Score;
                        answer.AnswerInt = internalCount;
                    }
                }

                // 4. Сохраняем ответы
                await _userAnswerService.AddRangeAsync(request.Answers);

                // 5. Завершаем сессию
                await _testSessionService.EndSessionAsync(sessionId, request.Reason);

                return Ok(evaluationResult);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🔥 Error during session termination: {ex.Message}");
                return StatusCode(500, "Error during session termination");
            }
        }


    }
}
