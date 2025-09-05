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
    }
}
