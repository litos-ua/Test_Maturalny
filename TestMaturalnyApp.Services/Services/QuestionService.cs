
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Services
{
    public class QuestionService : IQuestionService, IQuestionAdminService
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IQuestionAdminRepository _questionAdminRepository;
        private readonly ITestSessionRepository _testSessionRepository;
        private readonly ILogger<QuestionService> _logger;

        public QuestionService(
            IQuestionRepository repository,
            IQuestionAdminRepository adminRepository,
            ITestSessionRepository testSessionRepository,
            ILogger<QuestionService> logger)
        {
            _questionRepository = repository;
            _questionAdminRepository = adminRepository;
            _testSessionRepository = testSessionRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Question>> GetAllAsync()
        {
            try
            {
                var dataEntities = await _questionRepository.GetAllAsync();
                return dataEntities.Select(QuestionMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting all questions");
                throw;
            }
        }

        // Для админ
        public async Task<PagedResult<Question>> GetPagedAsync(
            int pageNumber, 
            int pageSize, string? 
            filter = null,
            string? sortField = null,
            string? sortOrder = null)
        {
            try
            {
                var paged = await _questionAdminRepository.GetPagedAsync(pageNumber, pageSize, filter, sortField, sortOrder);

                return new PagedResult<Question>
                {
                    Items = paged.Items.Select(QuestionMapper.MapToDomain).ToList(),
                    TotalCount = paged.TotalCount,
                    PageNumber = paged.PageNumber,
                    PageSize = paged.PageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting paged questions.");
                throw;
            }
        }

        // Для админ. Одновременно для пагинации и ids[]
        //public async Task<PagedResult<Question>> GetPagedOrManyAsync(
        //    int? pageNumber = null,
        //    int? pageSize = null,
        //    IEnumerable<int>? ids = null,
        //    string? filter = null,
        //    string? sortField = null,
        //    string? sortOrder = null)
        //{
        //    try
        //    {
        //        if (ids != null && ids.Any())
        //        {
        //            // тут берём конкретные вопросы по ids
        //            var many = await _questionAdminRepository.GetManyAsync(ids);

        //            return new PagedResult<Question>
        //            {
        //                Items = many.Select(QuestionMapper.MapToDomain).ToList(),
        //                TotalCount = many.Count(),
        //                PageNumber = 1,
        //                PageSize = many.Count()
        //            };
        //        }
        //        else
        //        {
        //            // пагинация (как у тебя уже было)
        //            var paged = await _questionAdminRepository
        //                .GetPagedAsync(pageNumber ?? 1, pageSize ?? 10, filter, sortField, sortOrder);

        //            return new PagedResult<Question>
        //            {
        //                Items = paged.Items.Select(QuestionMapper.MapToDomain).ToList(),
        //                TotalCount = paged.TotalCount,
        //                PageNumber = paged.PageNumber,
        //                PageSize = paged.PageSize
        //            };
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error while getting questions (paged or many).");
        //        throw;
        //    }
        //}


        public async Task<PagedResult<Question>> GetPagedOrManyAsync(
            int? pageNumber = null,
            int? pageSize = null,
            IEnumerable<int>? ids = null,
            int? disciplineId = null,
            int? topicId = null,
            string? filter = null,
            string? sortField = null,
            string? sortOrder = null)
        {
            //---------------------------
            if (topicId != null)
            {
                int a = 1;
            }
            //---------------------------

            try
            {
                if (ids != null && ids.Any())
                {
                    var many = await _questionAdminRepository.GetManyAsync(ids);

                    return new PagedResult<Question>
                    {
                        Items = many.Select(QuestionMapper.MapToDomain).ToList(),
                        TotalCount = many.Count(),
                        PageNumber = 1,
                        PageSize = many.Count()
                    };
                }
                else
                {
                    var paged = await _questionAdminRepository
                        .GetPagedAsync(pageNumber ?? 1, pageSize ?? 10, filter, sortField, sortOrder, disciplineId, topicId);

                    return new PagedResult<Question>
                    {
                        Items = paged.Items.Select(QuestionMapper.MapToDomain).ToList(),
                        TotalCount = paged.TotalCount,
                        PageNumber = paged.PageNumber,
                        PageSize = paged.PageSize
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting questions (paged or many).");
                throw;
            }
        }


        public async Task<IEnumerable<Question>> GetByDisciplineIdAsync(int disciplineId)
        {
            try
            {
                var data = await _questionRepository.GetByDisciplineIdAsync(disciplineId);
                return data.Select(QuestionMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting questions by disciplineId: {DisciplineId}", disciplineId);
                throw;
            }
        }

        public async Task<Question?> GetByIdAsync(int id)
        {
            try
            {
                var data = await _questionRepository.GetByIdAsync(id);
                return data == null ? null : QuestionMapper.MapToDomain(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting question by id: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<Question>> GetByTopicIdAsync(int topicId)
        {
            try
            {
                var dataEntities = await _questionRepository.GetByTopicIdAsync(topicId);
                return dataEntities.Select(QuestionMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting questions by topicId: {TopicId}", topicId);
                throw;
            }
        }

        public async Task<Question> CreateAsync(Question domainQuestion)
        {
            try
            {
                var dataEntity = QuestionMapper.MapToData(domainQuestion);
                var created = await _questionRepository.CreateAsync(dataEntity);
                return QuestionMapper.MapToDomain(created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating question");
                throw;
            }
        }

        public async Task<Question?> UpdateAsync(Question domainQuestion)
        {
            try
            {
                var existing = await _questionRepository.GetByIdAsync(domainQuestion.Id);
                if (existing == null)
                    return null;

                var dataQuestion = QuestionMapper.MapToData(domainQuestion);
                var updated = await _questionRepository.UpdateAsync(dataQuestion);

                return QuestionMapper.MapToDomain(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating question with id: {Id}", domainQuestion.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                return await _questionRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting question with id: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<Question>> GetRandomByTopicAsync(int topicId, int count)
        {
            try
            {
                var dataEntities = await _questionRepository.GetRandomByTopicAsync(topicId, count);
                return dataEntities.Select(QuestionMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting random questions by topicId: {TopicId}", topicId);
                throw;
            }
        }

        public async Task<IEnumerable<Question>> GetRandomByDisciplineGroupedByTopicAsync(int disciplineId, int countPerTopic)
        {
            try
            {
                var dataEntities = await _questionRepository.GetRandomByDisciplineGroupedByTopicAsync(disciplineId, countPerTopic);
                return dataEntities.Select(QuestionMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting random questions by disciplineId grouped by topic: {DisciplineId}", disciplineId);
                throw;
            }
        }

        public async Task<IEnumerable<Question>> GetRandomByDisciplineAsync(int disciplineId, int totalCount)
        {
            try
            {
                var dataEntities = await _questionRepository.GetRandomByDisciplineAsync(disciplineId, totalCount);
                return dataEntities.Select(QuestionMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting random questions by disciplineId: {DisciplineId}", disciplineId);
                throw;
            }
        }
    }
}
