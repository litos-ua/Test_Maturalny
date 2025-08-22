using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Interfaces.Admin
{
    public interface IAnswerOptionAdminService
    {
        Task<PagedResult<AnswerOption>> GetPagedAsync(int pageNumber, int pageSize, string? filterTerm, string? sortField, string? sortOrder);
        Task<PagedResult<Domain.Entities.AnswerOption>> GetPagedOrManyAsync(
            int pageNumber,
            int pageSize,
            string? filterTerm,
            string? sortField,
            string? sortOrder,
            IEnumerable<int>? ids = null);
        Task<AnswerOption?> GetByIdAsync(int id);
        Task<AnswerOption> CreateAsync(AnswerOption entity);
        Task<AnswerOption?> UpdateAsync(AnswerOption entity);
        Task<bool> DeleteAsync(int id);
    }

}
