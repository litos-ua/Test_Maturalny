using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface ITopicService
    {
        Task<IEnumerable<Topic>> GetAllAsync();
        Task<Topic?> GetByIdAsync(int id);
        Task<IEnumerable<Topic>> GetByDisciplineIdAsync(int disciplineId);
        Task<Topic> CreateAsync(Topic domainTopic);
        Task<Topic?> UpdateAsync(Topic domainTopic);
        Task<bool> DeleteAsync(int id);
    }
}
