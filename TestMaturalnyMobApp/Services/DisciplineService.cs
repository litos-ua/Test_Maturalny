using TestMaturalnyMobApp.Models;
using TestMaturalnyMobApp.Services.Api;

namespace TestMaturalnyMobApp.Services;

public class DisciplineService
{
    private readonly ApiClient _apiClient;

    public DisciplineService(ApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<List<DisciplineDto>> GetDisciplines()
    {
        return await _apiClient.GetAsync<List<DisciplineDto>>(ApiEndpoints.Disciplines);
    }

    public async Task<DisciplineDto> GetDisciplineById(int id)
    {
        var endpoint = string.Format(ApiEndpoints.DisciplineById, id);
        return await _apiClient.GetAsync<DisciplineDto>(endpoint);
    }

    public async Task<DisciplineDto> CreateDiscipline(CreateDisciplineDto data)
    {
        return await _apiClient.PostAsync<DisciplineDto>(ApiEndpoints.Disciplines, data);
    }

    public async Task<DisciplineDto> UpdateDiscipline(UpdateDisciplineDto data)
    {
        var endpoint = string.Format(ApiEndpoints.DisciplineById, data.Id);
        return await _apiClient.PutAsync<DisciplineDto>(endpoint, data);
    }

    public async Task DeleteDiscipline(int id)
    {
        var endpoint = string.Format(ApiEndpoints.DisciplineById, id);
        await _apiClient.DeleteAsync(endpoint);
    }
}
