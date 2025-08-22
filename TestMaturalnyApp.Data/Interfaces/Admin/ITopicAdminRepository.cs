using TestMaturalnyApp.Data.Entities;
using global::TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Interfaces.Admin
{
        public interface ITopicAdminRepository
        {
            Task<PagedResult<Topic>> GetPagedAsync(
                int pageNumber, 
                int pageSize, 
                string? sortField, 
                string? sortOrder,
                int? filter
                );
            Task<Topic?> GetByIdAsync(int id);
            Task<IEnumerable<Topic>> GetByDisciplineIdAsync(int disciplineId);
            Task<Topic> CreateAsync(Topic topic);
            Task<Topic> UpdateAsync(Topic topic);
            Task<bool> DeleteAsync(int id);
    }
}
