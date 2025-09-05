using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Services.Mapping;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Entities.DTOs;
using System.Linq;


namespace TestMaturalnyApp.Services.Services
{
    public class TopicService : ITopicAdminService
    {
        private readonly ITopicRepository _topicRepository;
        private readonly ITopicAdminRepository _topicAdminRepository;

        public TopicService(ITopicRepository topicRepository, ITopicAdminRepository topicAdminRepository)
        {
            _topicRepository = topicRepository;
            _topicAdminRepository = topicAdminRepository;

        }

        public async Task<IEnumerable<Topic>> GetAllAsync()
        {
            var dataEntities = await _topicRepository.GetAllAsync();
            return dataEntities.Select(TopicMapper.MapToDomain);
        }


        public async Task<PagedResult<TopicDto>> GetPagedAsync(
                    int pageNumber, 
                    int pageSize, 
                    string? sortField, 
                    string? sortOrder,
                    int? filter)
        {
            var pagedData = await _topicAdminRepository.GetPagedAsync(pageNumber, pageSize, sortField, sortOrder, filter);

            // Преобразуем Data.Topic -> Domain.Topic -> TopicDto
            var itemsDto = pagedData.Items
                .Select(dataTopic => TopicMapper.MapToDomain(dataTopic)) // Data -> Domain
                .Select(domainTopic => TopicDtoMapper.MapToDto(domainTopic)) // Domain -> DTO
                .ToList();

            return new PagedResult<TopicDto>
            {
                Items = itemsDto,
                TotalCount = pagedData.TotalCount,
                PageNumber = pagedData.PageNumber,
                PageSize = pagedData.PageSize
            };
        }



        public async Task<Topic?> GetByIdAsync(int id)
        {
            var data = await _topicRepository.GetByIdAsync(id);
            return data == null ? null : TopicMapper.MapToDomain(data);
        }

        public async Task<IEnumerable<Topic>> GetByDisciplineIdAsync(int disciplineId)
        {
            var dataEntities = await _topicRepository.GetByDisciplineIdAsync(disciplineId);
            return dataEntities.Select(TopicMapper.MapToDomain);
        }

        public async Task<Topic> CreateAsync(Topic domainTopic)
        {
            var dataEntity = TopicMapper.MapToData(domainTopic);
            var created = await _topicRepository.CreateAsync(dataEntity);
            return TopicMapper.MapToDomain(created);
        }

        public async Task<Topic?> UpdateAsync(Topic domainTopic)
        {
            var existing = await _topicRepository.GetByIdAsync(domainTopic.Id);
            if (existing == null)
                return null;

            var dataTopic = TopicMapper.MapToData(domainTopic);
            var updated = await _topicRepository.UpdateAsync(dataTopic);

            return TopicMapper.MapToDomain(updated);
        }


        public async Task<bool> DeleteAsync(int id)
        {
            return await _topicRepository.DeleteAsync(id);
        }
    }
}


