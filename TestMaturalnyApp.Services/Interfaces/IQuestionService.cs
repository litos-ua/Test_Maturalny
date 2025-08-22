using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Models;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IQuestionService
    {
        // Получить все вопросы
        Task<IEnumerable<Question>> GetAllAsync();
        // Получить вопрос по Id
        Task<Question?> GetByIdAsync(int id);
        // Получить все вопросы по дисциплине
        Task<IEnumerable<Question>> GetByDisciplineIdAsync(int disciplineId);
        // Получить все вопросы по теме
        Task<IEnumerable<Question>> GetByTopicIdAsync(int topicId);
        // Создать новый вопрос
        Task<Question> CreateAsync(Question question);
        // Обновить существующий вопрос
        Task<Question?> UpdateAsync(Question question);
        // Удалить вопрос по Id
        Task<bool> DeleteAsync(int id);
        // Получить случайные вопросы по теме
        Task<IEnumerable<Question>> GetRandomByTopicAsync(int topicId, int count);
        // Получить случайные вопросы по теме из определенной дисциплины
        Task<IEnumerable<Question>> GetRandomByDisciplineGroupedByTopicAsync(int disciplineId, int countPerTopic);
        // Получить N случайных вопросов по всей дисциплине
        Task<IEnumerable<Question>> GetRandomByDisciplineAsync(int disciplineId, int totalCount);
        // В полученный методом GetRandomByDisciplineAsync списке вопросов перемешиваем опции внутри каждого вопроса и сохраняем маску
        //Task<CreatedTestSessionDto> CreateRandomTestAsync(int disciplineId, int totalCount, int userId);

        // Перенесен в TestSessionService
        //Task<CreatedTestSessionDto> CreateRandomRealTestAsync(int disciplineId, int totalCount, int userId, int? timeLimitSeconds, string? description);
    }
}
