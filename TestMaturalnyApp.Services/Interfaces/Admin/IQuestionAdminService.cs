using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces.Admin
{
    public interface IQuestionAdminService: IQuestionService
    {
        Task<PagedResult<Question>> GetPagedAsync(
            int pageNumber, 
            int pageSize, 
            string? filter = null,
            string? sortField = null,
            string? sortOrder = null);
        Task<PagedResult<Question>> GetPagedOrManyAsync(
            int? pageNumber = null,
            int? pageSize = null,
            IEnumerable<int>? ids = null,
            int? disciplineId = null, // Добавлено
            int? topicId = null,   // Добавлено
            string? filter = null,
            string? sortField = null,
            string? sortOrder = null);
    }
}
