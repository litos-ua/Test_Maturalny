using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;

namespace TestMaturalnyApp.Data.Repositories
{
    public class UserAnswerRepository : IUserAnswerRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UserAnswerRepository> _logger;

        public UserAnswerRepository(AppDbContext context, ILogger<UserAnswerRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<UserAnswer> CreateAsync(UserAnswer answer)
        {
            try
            {
                _context.UserAnswers.Add(answer);
                await _context.SaveChangesAsync();
                return answer;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user response");
                throw;
            }
        }

        public async Task<UserAnswer> UpdateAsync(UserAnswer answer)
        {
            try
            {
                _context.UserAnswers.Update(answer);
                await _context.SaveChangesAsync();
                return answer;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user response with id: {Id}", answer.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var answer = await _context.UserAnswers.FindAsync(id);
                if (answer == null)
                {
                    _logger.LogWarning("Attempt to delete non-existent response with id: {Id}", id);
                    return false;
                }

                _context.UserAnswers.Remove(answer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user response with id: {Id}", id);
                throw;
            }
        }

        public async Task<UserAnswer?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.UserAnswers.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user response by id: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<UserAnswer>> GetBySessionIdAsync(int sessionId)
        {
            try
            {
                return await _context.UserAnswers
                    .Where(a => a.TestSessionId == sessionId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user responses by sessionId: {SessionId}", sessionId);
                throw;
            }
        }

        public async Task SaveAnswersAsync(IEnumerable<UserAnswer> answers)
        {
            try
            {
                _context.UserAnswers.AddRange(answers);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "Error updating database when saving user answers in bulk");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unknown error when bulk saving user answers");
                throw;
            }
        }

        public async Task SaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving context changes");
                throw;
            }
        }
    }

}
























// Записывает по одной записи в UserUnswers и UserUnswerOptions
//public async Task SaveAnswersAsync(IEnumerable<(UserAnswer answer, List<int> selectedOptionIds)> answersWithOptions)
//{
//    foreach (var (answer, selectedOptionIds) in answersWithOptions)
//    {
//        _context.UserAnswers.Add(answer);
//        await _context.SaveChangesAsync(); // получаем Id

//        var userAnswerOptions = selectedOptionIds.Select(optionId => new UserAnswerOption
//        {
//            UserAnswerId = answer.Id,
//            AnswerOptionId = optionId
//        });

//        _context.UserAnswerOptions.AddRange(userAnswerOptions);
//        await _context.SaveChangesAsync();
//    }
//}

//public async Task SaveAnswersAsync(IEnumerable<(UserAnswer answer, List<int> selectedOptionIds)> answersWithOptions)
//{
//    foreach (var (answer, selectedOptionIds) in answersWithOptions)
//    {
//        try
//        {
//            // Сохраняем сам ответ
//            _context.UserAnswers.Add(answer);
//            await _context.SaveChangesAsync(); // Получаем ID

//            // Связываем с выбранными вариантами ответа
//            var userAnswerOptions = selectedOptionIds.Select(optionId => new UserAnswerOption
//            {
//                UserAnswerId = answer.Id,
//                AnswerOptionId = optionId
//            });

//            _context.UserAnswerOptions.AddRange(userAnswerOptions);
//            await _context.SaveChangesAsync();
//        }
//        catch (DbUpdateException dbEx)
//        {
//            // Логируем проблему с БД, можно расширить лог
//            Console.WriteLine($"Ошибка при сохранении UserAnswer или его опций. ID вопроса: {answer.QuestionId}, ID сессии: {answer.TestSessionId}");
//            Console.WriteLine($"Сообщение: {dbEx.Message}");

//            // При необходимости можно выбросить дальше
//            throw;
//        }
//        catch (Exception ex)
//        {
//            // Логируем прочие ошибки
//            Console.WriteLine($"Непредвиденная ошибка при сохранении ответа. Сообщение: {ex.Message}");

//            // Можно пропустить, или остановить выполнение
//            throw;
//        }
//    }
//}

//public async Task SaveAnswersAsync(IEnumerable<(UserAnswer answer, List<int> selectedOptionIds)> answersWithOptions)
//{
//    foreach (var (answer, selectedOptionIds) in answersWithOptions)
//    {
//        try
//        {
//            _context.UserAnswers.Add(answer);
//            await _context.SaveChangesAsync();

//            var userAnswerOptions = selectedOptionIds.Select(optionId => new UserAnswerOption
//            {
//                UserAnswerId = answer.Id,
//                AnswerOptionId = optionId
//            });

//            _context.UserAnswerOptions.AddRange(userAnswerOptions);
//            await _context.SaveChangesAsync();
//        }
//        catch (DbUpdateException dbEx)
//        {
//            Console.WriteLine($"Ошибка при сохранении UserAnswer. QuestionId: {answer.QuestionId}, SessionId: {answer.TestSessionId}");
//            Console.WriteLine($"DB Error: {dbEx.Message}");
//            throw;
//        }
//        catch (Exception ex)
//        {
//            Console.WriteLine($"Неизвестная ошибка: {ex.Message}");
//            throw;
//        }
//    }
//}
