
namespace TestMaturalnyApp.Services.Mapping
{
    public static class AnswerOptionMapper
    {
        public static Domain.Entities.AnswerOption MapToDomain(Data.Entities.AnswerOption data) => new()
        {
            Id = data.Id,
            Text = data.Text,
            IsCorrect = data.IsCorrect,
            Explanation = data.Explanation,
            QuestionId = data.QuestionId,
            GroupKey = data.GroupKey,
            MatchLabel = data.MatchLabel,
            CreatedAt = data.CreatedAt,
            UpdatedAt = data.UpdatedAt
        };

        public static Data.Entities.AnswerOption MapToData(Domain.Entities.AnswerOption domain) => new()
        {
            Id = domain.Id,
            Text = domain.Text,
            IsCorrect = domain.IsCorrect,
            Explanation = domain.Explanation,
            QuestionId = domain.QuestionId,
            GroupKey = domain.GroupKey,
            MatchLabel = domain.MatchLabel,
            CreatedAt = domain.CreatedAt,
            UpdatedAt = domain.UpdatedAt
        };
    }
}
