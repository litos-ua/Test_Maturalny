
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class DisciplineStatisticsDtoMapper
    {
        public static DisciplineStatisticsDto MapToDto(
            int disciplineId,
            string disciplineName,
            int totalQuestions,
            int totalSessions,
            double averageScore,
            int totalUsers
        ) => new DisciplineStatisticsDto
        {
            DisciplineId = disciplineId,
            DisciplineName = disciplineName,
            TotalQuestions = totalQuestions,
            TotalTestSessions = totalSessions,
            AverageScore = averageScore,
            TotalUsers = totalUsers
        };
    }

}
