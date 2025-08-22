

using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class QuestionMapper
    {
        public static Domain.Entities.Question MapToDomain(Data.Entities.Question data)
        {
            return new Domain.Entities.Question
            {
                Id = data.Id,
                Text = data.Text,
                ImageUrl = data.ImageUrl,
                Type = data.Type,
                MaxScore = data.MaxScore,
                Difficulty = data.Difficulty,
                CreatedAt = data.CreatedAt,
                UpdatedAt = data.UpdatedAt,
                TopicId = data.TopicId,
                Options = data.Options.Select(AnswerOptionMapper.MapToDomain).ToList()
            };
        }

        public static Data.Entities.Question MapToData(Domain.Entities.Question domain)
        {
            return new Data.Entities.Question
            {
                Id = domain.Id,
                Text = domain.Text,
                ImageUrl = domain.ImageUrl,
                Type = domain.Type,
                MaxScore = domain.MaxScore,
                Difficulty = domain.Difficulty,
                CreatedAt = domain.CreatedAt,
                UpdatedAt = domain.UpdatedAt,
                TopicId = domain.TopicId,
                Options = domain.Options.Select(AnswerOptionMapper.MapToData).ToList()
            };
        }
    }
}
