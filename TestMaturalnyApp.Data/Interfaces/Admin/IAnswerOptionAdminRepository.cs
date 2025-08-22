using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Interfaces.Admin
{
    public interface IAnswerOptionAdminRepository
    {
        Task<PagedResult<AnswerOption>> GetPagedAsync(int pageNumber, int pageSize, string? filterTerm, string? sortField, string? sortOrder);
        Task<AnswerOption?> GetByIdAsync(int id);
        Task<IEnumerable<AnswerOption>> GetManyAsync(IEnumerable<int> ids);
        Task<AnswerOption> CreateAsync(AnswerOption entity);
        Task<AnswerOption?> UpdateAsync(AnswerOption entity);
        Task<bool> DeleteAsync(int id);
    }

}
