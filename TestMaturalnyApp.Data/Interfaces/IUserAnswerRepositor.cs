using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Interfaces
{
    public interface IUserAnswerRepository
    {
        Task<UserAnswer> CreateAsync(UserAnswer answer);
        Task<UserAnswer> UpdateAsync(UserAnswer answer);
        Task<bool> DeleteAsync(int id);
        Task<UserAnswer?> GetByIdAsync(int id);
        Task<IEnumerable<UserAnswer>> GetBySessionIdAsync(int sessionId);
        Task SaveChangesAsync();

        /// <summary>
        /// Массовое сохранение ответов без опций.
        /// Поле SelectedOptionJson уже должно быть заполнено.
        /// </summary>
        Task SaveAnswersAsync(IEnumerable<UserAnswer> answers);
    }


}
