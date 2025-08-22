using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories
{
    public class QuestionRepository : IQuestionRepository, IQuestionAdminRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DisciplineRepository> _logger;

        public QuestionRepository(AppDbContext context, ILogger<DisciplineRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Question>> GetAllAsync()
        {
            try
            {
                return await _context.Questions
                    .Include(q => q.Options)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting paged disciplines.");
                throw new RepositoryException("Error getting all questions", ex);
            }
        }

        // Для админ для пагинации
        //public async Task<PagedResult<Question>> GetPagedAsync(
        //    int pageNumber,
        //    int pageSize,
        //    string? filter = null,
        //    string? sortField = null,
        //    string? sortOrder = null)
        //{
        //    try
        //    {
        //        if (pageNumber <= 0) pageNumber = 1;
        //        if (pageSize <= 0) pageSize = 10;

        //        IQueryable<Question> q = _context.Questions
        //            .Include(x => x.Options)
        //            .Include(x => x.Topic);

        //        // simple filter: if "filter" provided search inside Text and Options text
        //        if (!string.IsNullOrWhiteSpace(filter))
        //        {
        //            var f = filter.Trim();
        //            q = q.Where(x =>
        //                EF.Functions.Like(x.Text, $"%{f}%")
        //                || x.Options.Any(o => EF.Functions.Like(o.Text, $"%{f}%")));
        //        }

        //        // sorting white-list: allow only safe column names
        //        bool desc = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);

        //        if (!string.IsNullOrWhiteSpace(sortField))
        //        {
        //            switch (sortField.Trim().ToLowerInvariant())
        //            {
        //                case "id":
        //                    q = desc ? q.OrderByDescending(x => x.Id) : q.OrderBy(x => x.Id);
        //                    break;
        //                case "text":
        //                    q = desc ? q.OrderByDescending(x => x.Text) : q.OrderBy(x => x.Text);
        //                    break;
        //                case "topicid":
        //                    q = desc ? q.OrderByDescending(x => x.TopicId) : q.OrderBy(x => x.TopicId);
        //                    break;
        //                case "maxscore":
        //                    q = desc ? q.OrderByDescending(x => x.MaxScore) : q.OrderBy(x => x.MaxScore);
        //                    break;
        //                case "type":
        //                    q = desc ? q.OrderByDescending(x => x.Type) : q.OrderBy(x => x.Type);
        //                    break;
        //                default:
        //                    q = q.OrderBy(x => x.Id);
        //                    break;
        //            }
        //        }
        //        else
        //        {
        //            q = q.OrderBy(x => x.Id);
        //        }

        //        var total = await q.CountAsync();

        //        var items = await q
        //            .Skip((pageNumber - 1) * pageSize)
        //            .Take(pageSize)
        //            .ToListAsync();

        //        return new PagedResult<Question>
        //        {
        //            Items = items,
        //            TotalCount = total,
        //            PageNumber = pageNumber,
        //            PageSize = pageSize
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error while getting paged questions.");
        //        throw new RepositoryException("Error while getting paged questions.", ex);
        //    }
        //}

        public async Task<PagedResult<Question>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? filter = null,
            string? sortField = null,
            string? sortOrder = null,
            int? disciplineId = null,
            int? topicId = null)
        {
            try
            {
                if (pageNumber <= 0) pageNumber = 1;
                if (pageSize <= 0) pageSize = 10;

                IQueryable<Question> q = _context.Questions
                    .Include(x => x.Options)
                    .Include(x => x.Topic);

                // disciplineId → фильтруем через навигацию Topic.DisciplineId
                if (disciplineId.HasValue)
                    q = q.Where(x => x.Topic.DisciplineId == disciplineId.Value);

                // topicId → фильтруем напрямую
                if (topicId.HasValue)
                    q = q.Where(x => x.TopicId == topicId.Value);

                if (!string.IsNullOrWhiteSpace(filter))
                {
                    var f = filter.Trim();
                    q = q.Where(x =>
                        EF.Functions.Like(x.Text, $"%{f}%")
                        || x.Options.Any(o => EF.Functions.Like(o.Text, $"%{f}%")));
                }

                bool desc = string.Equals(sortOrder, "DESC", StringComparison.OrdinalIgnoreCase);

                if (!string.IsNullOrWhiteSpace(sortField))
                {
                    switch (sortField.Trim().ToLowerInvariant())
                    {
                        case "id":
                            q = desc ? q.OrderByDescending(x => x.Id) : q.OrderBy(x => x.Id);
                            break;
                        case "text":
                            q = desc ? q.OrderByDescending(x => x.Text) : q.OrderBy(x => x.Text);
                            break;
                        case "topicid":
                            q = desc ? q.OrderByDescending(x => x.TopicId) : q.OrderBy(x => x.TopicId);
                            break;
                        case "maxscore":
                            q = desc ? q.OrderByDescending(x => x.MaxScore) : q.OrderBy(x => x.MaxScore);
                            break;
                        case "type":
                            q = desc ? q.OrderByDescending(x => x.Type) : q.OrderBy(x => x.Type);
                            break;
                        default:
                            q = q.OrderBy(x => x.Id);
                            break;
                    }
                }
                else
                {
                    q = q.OrderBy(x => x.Id);
                }

                var total = await q.CountAsync();

                var items = await q
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return new PagedResult<Question>
                {
                    Items = items,
                    TotalCount = total,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting paged questions.");
                throw new RepositoryException("Error while getting paged questions.", ex);
            }
        }


        // Для админ для ids[]
        public async Task<IEnumerable<Question>> GetManyAsync(IEnumerable<int> ids)
        {
            try
            {
                if (ids == null || !ids.Any())
                    return Enumerable.Empty<Question>();

                var questions = await _context.Questions
                    .Include(q => q.Options)
                    .Include(q => q.Topic)
                    .Where(q => ids.Contains(q.Id))
                    .ToListAsync();

                return questions;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting many questions by ids: {Ids}", string.Join(",", ids));
                throw new RepositoryException("Error while getting many questions", ex);
            }
        }



        public async Task<List<Question>> GetByIdsWithOptionsAsync(IEnumerable<int> questionIds)
        {
            try
            {
                return await _context.Questions
                    .Include(q => q.Options)
                    .Where(q => questionIds.Contains(q.Id))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving questions according to ID list.");
                throw new RepositoryException("Error retrieving questions according to ID list.", ex);
            }
        }

        public async Task<List<Question>> GetByIdsWithOptionsAndTopicsAsync (IEnumerable<int> questionIds)
        {
            try
            {
                return await _context.Questions
                    .Include(q => q.Options)
                    .Include(q => q.Topic)
                    .Where(q => questionIds.Contains(q.Id))
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting questions with options and topics according to list ID.");
                throw new RepositoryException("Error getting questions with options and topics according to list ID.", ex);
            }
        }

        public async Task<IEnumerable<Question>> GetByDisciplineIdAsync(int disciplineId)
        {
            try
            {
                return await _context.Questions
                    .Include(q => q.Options)
                    .Include(q => q.Topic)
                    .Where(q => q.Topic.DisciplineId == disciplineId)
                    .OrderBy(q => q.TopicId)
                    .ThenBy(q => q.Id)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting questions by discipline ID: {disciplineId}.");
                throw new RepositoryException($"Error getting questions by discipline ID: {disciplineId}: {disciplineId}", ex);
            }
        }

        public async Task<Question?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Questions
                    .Include(q => q.Options)
                    .FirstOrDefaultAsync(q => q.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting question by ID: {id}.");
                throw new RepositoryException($"Error getting question by ID: {id}", ex);
            }
        }

        public async Task<IEnumerable<Question>> GetByTopicIdAsync(int topicId)
        {
            try
            {
                return await _context.Questions
                    .Where(q => q.TopicId == topicId)
                    .Include(q => q.Options)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting question by Topic: {topicId}");
                throw new RepositoryException($"Error getting question by Topic: {topicId}", ex);
            }
        }

        public async Task<Question> CreateAsync(Question question)
        {
            try
            {
                _context.Questions.Add(question);
                await _context.SaveChangesAsync();
                return question;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating question.");
                throw new RepositoryException("Error creating question.", ex);
            }
        }

        public async Task<Question?> UpdateAsync(Question question)
        {
            try
            {
                var existing = await _context.Questions
                    .Include(q => q.Options)
                    .FirstOrDefaultAsync(q => q.Id == question.Id);

                if (existing == null) return null;

                existing.Text = question.Text;
                existing.ImageUrl = question.ImageUrl;
                existing.Type = question.Type;
                existing.MaxScore = question.MaxScore;
                existing.TopicId = question.TopicId;
                existing.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return existing;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating question ID: {question.Id}.");
                throw new RepositoryException($"Error updating question ID: {question.Id}.", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var question = await _context.Questions.FindAsync(id);
                if (question == null) return false;

                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting question ID: {id}.");
                throw new RepositoryException($"Error deleting question ID: {id}.", ex);
            }
        }

        // Получить N случайных вопросов по теме
        public async Task<IEnumerable<Question>> GetRandomByTopicAsync(int topicId, int count)
        {
            try
            {
                return await _context.Questions
                    .Where(q => q.TopicId == topicId)
                    .OrderBy(q => Guid.NewGuid())
                    .Take(count)
                    .Include(q => q.Options)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error while getting random questions by topic ID: {topicId}.");
                throw new RepositoryException($"Error while getting random questions by topic ID: {topicId}.", ex);
            }
        }

        // Получить случайные вопросы по теме из дисциплины (по N на каждую тему)
        public async Task<IEnumerable<Question>> GetRandomByDisciplineGroupedByTopicAsync(int disciplineId, int countPerTopic)
        {
            try
            {
                var topicIds = await _context.Topics
                    .Where(t => t.DisciplineId == disciplineId)
                    .Select(t => t.Id)
                    .ToListAsync();

                var questions = new List<Question>();

                foreach (var topicId in topicIds)
                {
                    var randomQuestions = await _context.Questions
                        .Where(q => q.TopicId == topicId)
                        .OrderBy(q => Guid.NewGuid())
                        .Take(countPerTopic)
                        .Include(q => q.Options)
                        .ToListAsync();

                    questions.AddRange(randomQuestions);
                }

                return questions;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting questions for discipline ID: {disciplineId} grouped by topics.");
                throw new RepositoryException($"Error getting questions for discipline ID: {disciplineId} grouped by topics", ex);
            }
        }

        // Получить N случайных вопросов по всей дисциплине
        public async Task<IEnumerable<Question>> GetRandomByDisciplineAsync(int disciplineId, int totalCount)
        {
            try
            {
                return await _context.Questions
                    .Where(q => q.Topic.DisciplineId == disciplineId)
                    .OrderBy(q => Guid.NewGuid())
                    .Take(totalCount)
                    .Include(q => q.Options)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error while getting random questions by discipline ID {disciplineId}.");
                throw new RepositoryException($"Error while getting random questions by discipline ID {disciplineId}.", ex);
            }
        }
    }

    // Кастомное исключение для репозитория
    public class RepositoryException : Exception
    {
        public RepositoryException(string message) : base(message) { }
        public RepositoryException(string message, Exception inner) : base(message, inner) { }
    }
}
