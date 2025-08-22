//using TestMaturalnyApp.Domain.Entities;
//using TestMaturalnyApp.Domain.Entities.DTOs;
//using TestMaturalnyApp.Domain.Models;

//namespace TestMaturalnyApp.Services.Interfaces.Admin
//{
//    public interface ITopicAdminService
//    {
//        Task<PagedResult<Topic>> GetPagedAsync(int pageNumber, int pageSize, string? sortField, string? sortOrder);
//        Task<Topic?> GetByIdAsync(int id);
//        Task<IEnumerable<Topic>> GetByDisciplineIdAsync(int disciplineId);
//        Task<Topic> CreateAsync(Topic domainTopic);
//        Task<Topic?> UpdateAsync(Topic domainTopic);
//        Task<bool> DeleteAsync(int id);
//    }
//}

using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.Services.Interfaces.Admin
{
    public interface ITopicAdminService: ITopicService
    {
        Task<PagedResult<TopicDto>> GetPagedAsync(
            int pageNumber, 
            int pageSize, 
            string? sortField, 
            string? sortOrder,
            int? filter
            );
        //Task<Topic?> GetByIdAsync(int id);
        //Task<IEnumerable<Topic>> GetByDisciplineIdAsync(int disciplineId);
        //Task<Topic> CreateAsync(Topic domainTopic);
        //Task<Topic?> UpdateAsync(Topic domainTopic);
        //Task<bool> DeleteAsync(int id);
    }
}
