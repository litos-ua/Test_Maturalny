using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Entities.DTOs.Models;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface ITestSessionService
    {
        Task<TestSessionDto> StartSessionAsync(CreateTestSessionDto dto);
        Task<TestSessionDto?> GetByIdAsync(int id);
        Task<IEnumerable<TestSessionDto>> GetByUserIdAsync(int userId);
        Task<TestSessionDto> CreateAsync(CreateTestSessionDto dto);
        Task<TestSessionDto?> EndSessionAsync(int sessionId, SessionEndReason reason);
        Task<CreatedTestSessionDto> CreateRandomRealTestAsync(int disciplineId, int totalCount, int userId, int? timeLimitSeconds, string? description);
    }

}
