//  Удалили модель (таблицу) UserUnswerOptions
//using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateUserAnswerDtoMapper
    {
        public static UserAnswer MapToDomain(UpdateUserAnswerDto dto)
        {
            return new UserAnswer
            {
                QuestionId = dto.QuestionId,
                Explanation = dto.Explanation,
                TestSessionId = dto.TestSessionId,
                SelectedOptionJson = dto.SelectedOptionIds ?? new List<int>()
            };
        }
    }


}

