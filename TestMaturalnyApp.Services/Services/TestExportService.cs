using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping;

namespace TestMaturalnyApp.Services.Services
{
    public class TestExportService : ITestExportService
    {
        private readonly ITestSessionRepository _sessionRepo;
        private readonly IUserAnswerRepository _answerRepo;
        private readonly IQuestionRepository _questionRepo;

        public TestExportService(
            ITestSessionRepository sessionRepo,
            IUserAnswerRepository answerRepo,
            IQuestionRepository questionRepo)
        {
            _sessionRepo = sessionRepo;
            _answerRepo = answerRepo;
            _questionRepo = questionRepo;
        }

        public async Task<TestExportDto> ExportSessionAsync(int sessionId)
        {
            // Получаем Data-сессию и маппим в Domain
            var sessionData = await _sessionRepo.GetByIdAsync(sessionId);
            if (sessionData == null)
                throw new Exception("Session not found");

            var session = TestSessionMapper.MapToDomain(sessionData);

            // Получаем Data-ответы и маппим в Domain
            var answerData = await _answerRepo.GetBySessionIdAsync(sessionId);
            var answers = answerData.Select(data => UserAnswerMapper.MapToDomain(data)).ToList();

            // Получаем Data-вопросы и маппим в Domain
            var questionIds = answers.Select(a => a.QuestionId).Distinct().ToList();
            var questionData = await _questionRepo.GetByIdsWithOptionsAsync(questionIds);
            var questions = questionData.Select(QuestionMapper.MapToDomain).ToList();

            return TestExportDtoMapper.MapToDto(session, answers, questions);
        }
    }

}
