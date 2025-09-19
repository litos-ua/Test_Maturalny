using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Models;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetAllAsync();
        Task<Question?> GetByIdAsync(int id);
        Task<Question?> GetByIdWithOptionsAsync(int id);
        Task<IEnumerable<Question>> GetByDisciplineIdAsync(int disciplineId);
        Task<IEnumerable<Question>> GetByTopicIdAsync(int topicId);
        Task<Question> CreateAsync(Question question);
        Task<Question?> UpdateAsync(Question question);
        Task<bool> DeleteAsync(int id);
        // Получить случайные вопросы по теме
        Task<IEnumerable<Question>> GetRandomByTopicAsync(int topicId, int count);
        // Получить случайные вопросы по теме из определенной дисциплины
        Task<IEnumerable<Question>> GetRandomByDisciplineGroupedByTopicAsync(int disciplineId, int countPerTopic);
        // Получить N случайных вопросов по всей дисциплине
        Task<IEnumerable<Question>> GetRandomByDisciplineAsync(int disciplineId, int totalCount);
    }
}
