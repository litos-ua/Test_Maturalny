using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class UserStatisticsDtoMapper
    {
        public static UserStatisticsDto MapToDto(User user, int totalSessions, double avgScore, int passedTests) => new()
        {
            UserId = user.Id,
            TotalSessions = totalSessions,
            AverageScore = avgScore,
            PassedTests = passedTests
        };
    }
}
