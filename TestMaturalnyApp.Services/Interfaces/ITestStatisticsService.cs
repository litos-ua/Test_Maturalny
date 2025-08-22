using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface ITestStatisticsService
    {
        // Список сессий пользователя
        Task<List<TestSessionUserSummaryDto>> GetUserCompletedSessionsAsync(int userId);
        Task<PagedResult<TestSessionUserSummaryDto>> GetUserCompletedSessionsAsync(int userId, int pageNumber, int pageSize);


        // Детальная информация по сессии
        Task<IEnumerable<TestSessionQuestionDetailDto>> GetSessionDetailsAsync(int sessionId);
    }

}
