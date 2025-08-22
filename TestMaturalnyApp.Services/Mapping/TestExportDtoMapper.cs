using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class TestExportDtoMapper
    {
        public static TestExportDto MapToDto(
            TestSession session,
            IEnumerable<UserAnswer> answers,
            IEnumerable<Question> questions)
        {
            double totalScore = answers.Sum(a => a.Score);

            var questionDtos = answers.Select(a =>
            {
                var q = questions.FirstOrDefault(q => q.Id == a.QuestionId);
                var correctIds = q?.Options
                    .Where(o => o.IsCorrect)
                    .Select(o => o.Id)
                    .ToList() ?? new();

                return new QuestionExportDto
                {
                    QuestionId = a.QuestionId,
                    QuestionText = q?.Text,
                    SelectedOptionIds = a.SelectedOptionJson, 
                    CorrectOptionIds = correctIds,
                    Score = a.Score
                };
            }).ToList();

            return new TestExportDto
            {
                SessionId = session.Id,
                UserId = session.UserId,
                Description = session.Description,
                StartedAt = session.StartedAt,
                EndedAt = session.EndedAt,
                TotalScore = totalScore,
                Questions = questionDtos
            };
        }
    }

}
