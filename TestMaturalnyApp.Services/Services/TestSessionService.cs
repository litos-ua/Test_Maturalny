using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Models;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping;
using TestMaturalnyApp.Services.Mapping.Dto;

namespace TestMaturalnyApp.Services.Services
{
    public class TestSessionService : ITestSessionService
    {
        private readonly ITestSessionRepository _sessionRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IMemoryCache _cache;
        private readonly ILogger<TestSessionService> _logger;

        public TestSessionService(
            ITestSessionRepository sessionRepository,
            IMemoryCache cache,
            IQuestionRepository questionRepository,
            ILogger<TestSessionService> logger)
        {
            _sessionRepository = sessionRepository;
            _cache = cache;
            _questionRepository = questionRepository;
            _logger = logger;
        }

        public async Task<TestSessionDto> StartSessionAsync(CreateTestSessionDto dto)
        {
            try
            {
                string cacheKey = $"recent_session_user_{dto.UserId}";

                if (_cache.TryGetValue(cacheKey, out TestSessionDto cachedSession))
                {
                    return cachedSession;
                }

                var domainSession = TestSessionDtoMapper.MapToDomain(dto);
                var dataSession = TestSessionMapper.MapToData(domainSession);
                var created = await _sessionRepository.CreateAsync(dataSession);
                var resultDto = TestSessionDtoMapper.MapToDto(TestSessionMapper.MapToDomain(created));

                _cache.Set(cacheKey, resultDto, TimeSpan.FromSeconds(10));

                return resultDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while starting a test session for user {UserId}", dto.UserId);
                throw;
            }
        }

        public async Task<TestSessionDto?> GetByIdAsync(int id)
        {
            try
            {
                var session = await _sessionRepository.GetByIdAsync(id);
                return session == null ? null
                    : TestSessionDtoMapper.MapToDto(TestSessionMapper.MapToDomain(session));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting test session by ID {SessionId}", id);
                throw;
            }
        }

        public async Task<IEnumerable<TestSessionDto>> GetByUserIdAsync(int userId)
        {
            try
            {
                var sessions = await _sessionRepository.GetByUserIdAsync(userId);
                return sessions.Select(s =>
                    TestSessionDtoMapper.MapToDto(TestSessionMapper.MapToDomain(s)));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting test sessions for user {UserId}", userId);
                throw;
            }
        }

        public async Task<TestSessionDto> CreateAsync(CreateTestSessionDto dto)
        {
            try
            {
                var domain = TestSessionDtoMapper.MapToDomain(dto);
                var data = TestSessionMapper.MapToData(domain);
                var created = await _sessionRepository.CreateAsync(data);
                return TestSessionDtoMapper.MapToDto(TestSessionMapper.MapToDomain(created));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating a new test session for user {UserId}", dto.UserId);
                throw;
            }
        }

        public async Task<TestSessionDto?> EndSessionAsync(int sessionId, SessionEndReason reason)
        {
            try
            {
                var ended = await _sessionRepository.EndSessionAsync(sessionId, DateTime.UtcNow, reason);
                return ended == null ? null
                    : TestSessionDtoMapper.MapToDto(TestSessionMapper.MapToDomain(ended));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while ending test session {SessionId}", sessionId);
                throw;
            }
        }

        public async Task<CreatedTestSessionDto> CreateRandomRealTestAsync(
            int disciplineId,
            int totalCount,
            int userId,
            int? timeLimitSeconds,
            string? description)
        {
            try
            {
                if (totalCount <= 0 || totalCount > 100)
                    throw new ArgumentException("Invalid number of questions.");

                var dataQuestions = await _questionRepository.GetRandomByDisciplineAsync(disciplineId, totalCount);
                var domainQuestions = dataQuestions.Select(QuestionMapper.MapToDomain).ToList();

                var rng = new Random();
                var mask = new ShuffleMask
                {
                    Questions = new List<int>(),
                    Options = new Dictionary<int, List<int>>()
                };

                foreach (var question in domainQuestions)
                {
                    mask.Questions.Add(question.Id);
                    var shuffledOptions = question.Options.OrderBy(_ => rng.Next()).ToList();
                    mask.Options[question.Id] = shuffledOptions.Select(o => o.Id).ToList();
                    question.Options = shuffledOptions;
                }

                var domainSession = new Domain.Entities.TestSession
                {
                    UserId = userId,
                    JsonMask = JsonSerializer.Serialize(mask),
                    StartedAt = DateTime.UtcNow,
                    TimeLimitSeconds = timeLimitSeconds ?? null,
                };

                var dataSession = TestSessionMapper.MapToData(domainSession);
                await _sessionRepository.CreateAsync(dataSession);

                return new CreatedTestSessionDto
                {
                    SessionId = dataSession.Id,
                    Questions = domainQuestions.Select(QuestionDtoMapper.MapToDto).ToList()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating a random real test for user {UserId} in discipline {DisciplineId}", userId, disciplineId);
                throw;
            }
        }
    }
}
