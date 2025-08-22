
namespace TestMaturalnyApp.Services.Mapping
{
    public static class TestSessionMapper
    {
        public static Domain.Entities.TestSession MapToDomain(Data.Entities.TestSession data)
        {
            return new Domain.Entities.TestSession
            {
                Id = data.Id,
                UserId = data.UserId,
                TimeLimitSeconds = data.TimeLimitSeconds,
                StartedAt = data.StartedAt,
                EndedAt = data.EndedAt,
                Description = data.Description,
                JsonMask = data.JsonMask
            };
        }

        public static Data.Entities.TestSession MapToData(Domain.Entities.TestSession domain)
        {
            return new Data.Entities.TestSession
            {
                Id = domain.Id,
                UserId = domain.UserId,
                TimeLimitSeconds = domain.TimeLimitSeconds,
                //StartedAt = domain.StartedAt,  // Закомментировано, т.к. задано по умолчанию
                EndedAt = domain.EndedAt,
                Description = domain.Description,
                JsonMask = domain.JsonMask
            };
        }
    }

}
