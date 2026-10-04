using TestMaturalnyMobApp.Models;
using TestMaturalnyMobApp.Services.Api;

namespace TestMaturalnyMobApp.Services;

public class TopicService
{
    private readonly ApiClient _apiClient;

    public TopicService(ApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<List<TopicDto>> GetTopics()
    {
        return await _apiClient.GetAsync<List<TopicDto>>(ApiEndpoints.Topics);
    }

    public async Task<TopicDto> GetTopicById(int id)
    {
        var endpoint = string.Format(ApiEndpoints.TopicById, id);
        return await _apiClient.GetAsync<TopicDto>(endpoint);
    }

    public async Task<List<TopicDto>> GetTopicsByDisciplineId(int disciplineId)
    {
        var endpoint = string.Format(ApiEndpoints.TopicsByDiscipline, disciplineId);
        return await _apiClient.GetAsync<List<TopicDto>>(endpoint);
    }

    public async Task<TopicDto> CreateTopic(CreateTopicDto data)
    {
        return await _apiClient.PostAsync<TopicDto>(ApiEndpoints.Topics, data);
    }

    public async Task<TopicDto> UpdateTopic(UpdateTopicDto data)
    {
        var endpoint = string.Format(ApiEndpoints.TopicById, data.Id);
        return await _apiClient.PutAsync<TopicDto>(endpoint, data);
    }

    public async Task DeleteTopic(int id)
    {
        var endpoint = string.Format(ApiEndpoints.TopicById, id);
        await _apiClient.DeleteAsync(endpoint);
    }
}