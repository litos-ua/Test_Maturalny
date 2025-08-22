using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Interfaces.Admin
{
    public interface IQuestionAdminRepository:IQuestionRepository
    {
        Task<PagedResult<Question>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? filter = null,
            string? sortField = null,
            string? sortOrder = null,
            int? disciplineId = null,  // Добавлено
            int? topicId = null);      // Добавлено);

        Task<IEnumerable<Question>> GetManyAsync(IEnumerable<int> ids);
    }

}
