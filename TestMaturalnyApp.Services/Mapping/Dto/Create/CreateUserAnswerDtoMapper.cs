

//  Удалили модель (таблицу) UserUnswerOptions
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateUserAnswerDtoMapper
    {
        public static UserAnswer MapToDomain(CreateUserAnswerDto dto)
        {
            return new UserAnswer
            {
                QuestionId = dto.QuestionId,
                Explanation = dto.Explanation,
                Score = dto.Score,
                AnswerInt = dto.AnswerInt,
                TestSessionId = dto.TestSessionId,
                SelectedOptionJson = dto.SelectedOptionIds ?? new List<int>()
            };
        }
    }


}
