using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Repositories;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Services
{
    public class TestStatisticsService : ITestStatisticsService
    {
        private readonly ITestSessionRepository _testSessionRepository;
        private readonly IUserAnswerRepository _userAnswerRepo;
        private readonly IQuestionRepository _questionRepo;
        private readonly ILogger<TestStatisticsService> _logger;

        public TestStatisticsService(
            ITestSessionRepository sessionRepo,
            IUserAnswerRepository userAnswerRepo,
            IQuestionRepository questionRepo,
            ILogger<TestStatisticsService> logger)
        {
            _testSessionRepository = sessionRepo;
            _userAnswerRepo = userAnswerRepo;
            _questionRepo = questionRepo;
            _logger = logger;
        }

        // 1. Получение завершённых сессий пользователя
        public async Task<List<TestSessionUserSummaryDto>> GetUserCompletedSessionsAsync(int userId)
        {
            try
            {
                var sessions = await _testSessionRepository.GetByUserIdAsync(userId);

                var completedSessions = sessions
                    .Where(s => s.EndedAt.HasValue)
                    .OrderByDescending(s => s.StartedAt)
                    .ToList();

                return completedSessions.Select(session => new TestSessionUserSummaryDto
                {
                    SessionId = session.Id,
                    StartedAt = session.StartedAt,
                    Duration = session.EndedAt.Value - session.StartedAt,
                    TotalScore = session.UserAnswers.Sum(ua => ua.Score),
                    DisciplineName = session.UserAnswers
                        .Select(ua => ua.Question?.Topic?.Discipline?.Name)
                        .FirstOrDefault()
                        ?? string.Empty
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting completed sessions for user with userId: {UserId}", userId);
                throw;
            }
        }
        // Перегрузка для пагинации
        //public async Task<PagedResult<TestSessionUserSummaryDto>> GetUserCompletedSessionsAsync(int userId, int page, int pageSize)
        //{
        //    var pagedSessions = await _testSessionRepository.GetByUserIdAsync(userId, page, pageSize);

        //    var dtoItems = pagedSessions.Items
        //        .Where(s => s.EndedAt.HasValue)
        //        .Select(session => new TestSessionUserSummaryDto
        //        {
        //            SessionId = session.Id,
        //            StartedAt = session.StartedAt,
        //            Duration = session.EndedAt.Value - session.StartedAt,
        //            TotalScore = session.UserAnswers.Sum(ua => ua.Score),
        //            DisciplineName = session.UserAnswers
        //                .Select(ua => ua.Question?.Topic?.Discipline?.Name)
        //                .FirstOrDefault()
        //                ?? string.Empty
        //        }).ToList();

        //    return new PagedResult<TestSessionUserSummaryDto>
        //    {
        //        Items = dtoItems,
        //        TotalCount = pagedSessions.TotalCount,
        //        PageNumber = pagedSessions.PageNumber,
        //        PageSize = pagedSessions.PageSize
        //    };
        //}

        public async Task<PagedResult<TestSessionUserSummaryDto>> GetUserCompletedSessionsAsync(int userId, int page, int pageSize)
        {
            var pagedSessions = await _testSessionRepository.GetByUserIdAsync(userId, page, pageSize);

            var dtoItems = pagedSessions.Items
                .Select(session => new TestSessionUserSummaryDto
                {
                    SessionId = session.Id,
                    StartedAt = session.StartedAt,
                    Duration = session.EndedAt!.Value - session.StartedAt, // тут уже EndedAt точно есть
                    TotalScore = session.UserAnswers.Sum(ua => ua.Score),
                    DisciplineName = session.UserAnswers
                        .Select(ua => ua.Question?.Topic?.Discipline?.Name)
                        .FirstOrDefault()
                        ?? string.Empty
                })
                .ToList();

            return new PagedResult<TestSessionUserSummaryDto>
            {
                Items = dtoItems,
                TotalCount = pagedSessions.TotalCount,
                PageNumber = pagedSessions.PageNumber,
                PageSize = pagedSessions.PageSize
            };
        }




        // Получение детальной информации по сессии
        public async Task<IEnumerable<TestSessionQuestionDetailDto>> GetSessionDetailsAsync(int sessionId)
        {
            try
            {
                var session = await _testSessionRepository.GetBySessionIdWithDetailsAsync(sessionId);
                if (session == null)
                    throw new Exception($"Session with ID {sessionId} not found.");

                var questionDetails = session.UserAnswers
                    .OrderBy(ua => ua.AnswerInt) // сохраняем порядок
                    .Select(ua => new TestSessionQuestionDetailDto
                    {
                        QuestionNumber = ua.AnswerInt ?? 0,
                        QuestionText = ua.Question.Text,
                        QuestionType = ua.Question.Type.ToString(),
                        TopicId = ua.Question.Topic.Id,
                        TopicTitle = ua.Question.Topic.Title,
                        MaxScore = ua.Question.MaxScore,
                        Score = ua.Score
                    });

                return questionDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting session details for sessionId: {SessionId}", sessionId);
                throw;
            }
        }


    }
}
