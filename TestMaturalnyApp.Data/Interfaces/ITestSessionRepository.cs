using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface ITestSessionRepository
    {
        Task<IEnumerable<TestSession>> GetAllWithUserAnswersAsync();
        Task<TestSession?> GetByIdAsync(int id);
        Task<IEnumerable<TestSession>> GetByUserIdAsync(int userId);
        Task<PagedResult<TestSession>> GetByUserIdAsync(int userId, int pageNumber, int pageSize);

        // <Получение сессии, которая была создана совсем недавно для блокировки новой
        Task<TestSession?> GetLastCreatedByUserAsync(int userId);
        Task<TestSession?> GetActiveByUserIdAsync(int userId);
        Task<TestSession?> GetBySessionIdWithDetailsAsync(int sessionId);
        Task<TestSession> CreateAsync(TestSession session);
        Task<TestSession> UpdateAsync(TestSession session);
        Task<TestSession?> EndSessionAsync(int sessionId, DateTime endTime, SessionEndReason reason);
        Task SaveChangesAsync();
    }

}
