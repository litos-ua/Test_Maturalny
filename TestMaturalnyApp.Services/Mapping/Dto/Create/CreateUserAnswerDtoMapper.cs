

//  Удалили модель (таблицу) UserUnswerOptions
//using TestMaturalnyApp.Domain.Entities;
//using TestMaturalnyApp.Domain.Entities.DTOs.Create;

//namespace TestMaturalnyApp.Services.Mapping.Dto.Create
//{
//    public static class CreateUserAnswerDtoMapper
//    {
//        public static UserAnswer MapToDomain(CreateUserAnswerDto dto)
//        {
//            return new UserAnswer
//            {
//                QuestionId = dto.QuestionId,
//                Explanation = dto.Explanation,
//                Score = dto.Score,
//                AnswerInt = dto.AnswerInt,
//                TestSessionId = dto.TestSessionId,
//                SelectedOptionJson = dto.SelectedOptionIds ?? new List<int>()
//            };
//        }
//    }
//}

using System.Text.Json;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class CreateUserAnswerDtoMapper
    {
        public static UserAnswer MapToDomain(CreateUserAnswerDto dto)
        {
            var userAnswer = new UserAnswer
            {
                QuestionId = dto.QuestionId,
                Explanation = dto.Explanation,
                Score = dto.Score,
                AnswerInt = dto.AnswerInt,
                TestSessionId = dto.TestSessionId,
                SelectedOptionJson = dto.SelectedOptionIds ?? new List<int>()
            };

            // 🔑 Для OpenAnswer: зберігаємо текстові відповіді як JSON-рядок
            if (dto.GroupeLabel != null && dto.GroupeLabel.Count > 0)
            {
                userAnswer.GroupeLabel = JsonSerializer.Serialize(dto.GroupeLabel);
            }

            return userAnswer;
        }
    }
}




