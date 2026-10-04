using TestMaturalnyMobApp.Models;
using TestMaturalnyMobApp.Services.Api;

namespace TestMaturalnyMobApp.Services;

public class QuestionService
{
    private readonly ApiClient _apiClient;

    public QuestionService(ApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<List<Question>> GetRandomQuestionsByDiscipline(int disciplineId, int count = 30)
    {
        var endpoint = $"Questions/random/by-discipline/{disciplineId}/{count}";

        System.Diagnostics.Debug.WriteLine($"🌐 Запрос к API: {endpoint}");
        var result = await _apiClient.GetAsync<List<Question>>(endpoint);
        System.Diagnostics.Debug.WriteLine($"✅ Получено вопросов: {result?.Count ?? 0}");

        // ❌ УБИРАЕМ ДВОЙНОЙ ВЫЗОВ
        // return await _apiClient.GetAsync<List<Question>>(endpoint);
        return result ?? new List<Question>();
    }

    public async Task<List<Question>> GetQuestionsByTopic(int topicId)
    {
        var endpoint = $"Questions/topic/{topicId}";
        return await _apiClient.GetAsync<List<Question>>(endpoint);
    }
}