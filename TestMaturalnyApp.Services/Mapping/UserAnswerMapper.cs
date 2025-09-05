//  Удаляем модель (таблицу) UserUnswerOptions и все связи с ней.
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class UserAnswerMapper
    {
        public static Domain.Entities.UserAnswer MapToDomain(Data.Entities.UserAnswer data,
            bool includeQuestion = false,
            bool includeTestSession = false)
        {
            return new Domain.Entities.UserAnswer
            {
                Id = data.Id,
                UserId = data.UserId,
                QuestionId = data.QuestionId,
                Question = includeQuestion && data.Question != null
                    ? QuestionMapper.MapToDomain(data.Question)
                    : null!,
                SubmittedAt = data.SubmittedAt,
                Explanation = data.Explanation,
                Score = data.Score,
                GroupeLabel = data.GroupeLabel,
                AnswerInt = data.AnswerInt,
                TestSessionId = data.TestSessionId,
                TestSession = includeTestSession && data.TestSession != null
                    ? TestSessionMapper.MapToDomain(data.TestSession)
                    : null,
                // Распаковка из JSON
                SelectedOptionJson = JsonSerializer.Deserialize<List<int>>(data.SelectedOptionJson ?? "[]")
                     ?? new List<int>()

            };
        }


        public static Data.Entities.UserAnswer MapToData(Domain.Entities.UserAnswer domain)
        {
            return new Data.Entities.UserAnswer
            {
                Id = domain.Id,
                UserId = domain.UserId,
                QuestionId = domain.QuestionId,
                SubmittedAt = domain.SubmittedAt,
                Explanation = domain.Explanation,
                Score = domain.Score,
                GroupeLabel = domain.GroupeLabel,
                AnswerInt = domain.AnswerInt,
                TestSessionId = domain.TestSessionId,
                SelectedOptionJson = JsonSerializer.Serialize(domain.SelectedOptionJson)
            };
        }
    }

}

