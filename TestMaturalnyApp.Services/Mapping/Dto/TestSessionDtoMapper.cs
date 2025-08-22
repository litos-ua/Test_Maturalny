
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class TestSessionDtoMapper
    {
        public static TestSessionDto MapToDto(TestSession session) => new()
        {
            Id = session.Id,
            UserId = session.UserId,
            Description = session.Description,
            JsonMask = session.JsonMask,
            StartedAt = session.StartedAt,
            EndedAt = session.EndedAt,
            TimeLimitSeconds = session.TimeLimitSeconds,
            EndReason = session.EndReason,

            // 👇 Добавлены новые поля
            TotalScore = session.UserAnswers?.Sum(ua => ua.Score) ?? 0.0,
            Duration = session.EndedAt.HasValue ? session.EndedAt.Value - session.StartedAt : TimeSpan.Zero,
            DisciplineName = session.UserAnswers
                .Select(ua => ua.Question?.Topic?.Discipline?.Name)
                .FirstOrDefault(name => !string.IsNullOrEmpty(name)) ?? ""
        };

        public static TestSession MapToDomain(CreateTestSessionDto dto) => new()
        {
            UserId = dto.UserId,
            Description = dto.Description,
            JsonMask = dto.JsonMask,
            StartedAt = DateTime.UtcNow,
            TimeLimitSeconds = dto.TimeLimitSeconds
        };
    }

}
