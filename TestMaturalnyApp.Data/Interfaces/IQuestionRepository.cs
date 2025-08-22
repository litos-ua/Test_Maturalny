using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface IQuestionRepository
    {
        // Получить все вопросы
        Task<IEnumerable<Question>> GetAllAsync();

        // Получить вопрос по Id
        Task<Question?> GetByIdAsync(int id);

        // Получить вопрос с опциями по Id
        Task<List<Question>> GetByIdsWithOptionsAsync(IEnumerable<int> questionIds);
        // Получить вопрос с опциями и темами по Id
        Task<List<Question>> GetByIdsWithOptionsAndTopicsAsync(IEnumerable<int> questionIds);

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
    }
}
