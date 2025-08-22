

using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class TopicMapper
    {
        public static Domain.Entities.Topic MapToDomain(Data.Entities.Topic data) => new()
        {
            Id = data.Id,
            Title = data.Title,
            Level = data.Level,
            Description = data.Description,
            CreatedAt = data.CreatedAt,
            UpdatedAt = data.UpdatedAt,
            DisciplineId = data.DisciplineId,
            Questions = data.Questions.Select(QuestionMapper.MapToDomain).ToList()
        };


        public static Data.Entities.Topic MapToData(Domain.Entities.Topic domain) => new()
        {
            Id = domain.Id,
            Title = domain.Title,
            Level = domain.Level,
            Description = domain.Description,
            CreatedAt = domain.CreatedAt,
            UpdatedAt = domain.UpdatedAt,
            DisciplineId = domain.DisciplineId,
            Questions = domain.Questions.Select(QuestionMapper.MapToData).ToList()
        };
    }
}
