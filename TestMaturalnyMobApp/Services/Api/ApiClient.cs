//using System.Net.Http.Headers;
//using System.Text;
//using System.Text.Json;
//using TestMaturalnyMobApp.Constants;
//using TestMaturalnyMobApp.Services.Api;

//namespace TestMaturalnyMobApp.Services.Api;

//public class ApiClient
//{
//    private readonly HttpClient _httpClient;
//    private readonly JsonSerializerOptions _jsonOptions;

//    public ApiClient()
//    {
//        _httpClient = new HttpClient();
//        _httpClient.BaseAddress = new Uri(ApiConfig.CurrentBaseUrl);
//        _httpClient.DefaultRequestHeaders.Accept.Add(
//            new MediaTypeWithQualityHeaderValue("application/json"));
//        _httpClient.Timeout = TimeSpan.FromSeconds(30);

//        _jsonOptions = new JsonSerializerOptions
//        {
//            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
//            PropertyNameCaseInsensitive = true
//        };
//    }

//    // ===== GET =====
//    public async Task<T> GetAsync<T>(string endpoint)
//    {
//        var response = await _httpClient.GetAsync(endpoint);
//        return await HandleResponse<T>(response);
//    }

//    // ===== POST =====
//    public async Task<T> PostAsync<T>(string endpoint, object data = null)
//    {
//        var json = data != null ? JsonSerializer.Serialize(data, _jsonOptions) : "{}";
//        var content = new StringContent(json, Encoding.UTF8, "application/json");
//        var response = await _httpClient.PostAsync(endpoint, content);
//        return await HandleResponse<T>(response);
//    }

//    // ===== PUT =====
//    public async Task<T> PutAsync<T>(string endpoint, object data = null)
//    {
//        var json = data != null ? JsonSerializer.Serialize(data, _jsonOptions) : "{}";
//        var content = new StringContent(json, Encoding.UTF8, "application/json");
//        var response = await _httpClient.PutAsync(endpoint, content);
//        return await HandleResponse<T>(response);
//    }

//    // ===== DELETE =====
//    public async Task DeleteAsync(string endpoint)
//    {
//        var response = await _httpClient.DeleteAsync(endpoint);
//        await HandleResponse<object>(response);
//    }

//    // ===== PRIVATE =====
//    private async Task<T> HandleResponse<T>(HttpResponseMessage response)
//    {
//        var content = await response.Content.ReadAsStringAsync();

//        if (response.IsSuccessStatusCode)
//        {
//            if (typeof(T) == typeof(object))
//            {
//                return default;
//            }
//            return JsonSerializer.Deserialize<T>(content, _jsonOptions);
//        }

//        // Ошибка
//        throw new HttpRequestException($"API Error ({response.StatusCode}): {content}");
//    }

//    public void Dispose()
//    {
//        _httpClient?.Dispose();
//    }
//}

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TestMaturalnyMobApp.Constants;
using TestMaturalnyMobApp.Services.Api;

namespace TestMaturalnyMobApp.Services;

public class ApiClient
{
    private readonly HttpClient _httpClient;
    private readonly JsonSerializerOptions _jsonOptions;

    public ApiClient()
    {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri(ApiConfig.CurrentBaseUrl);
        _httpClient.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
        _httpClient.Timeout = TimeSpan.FromSeconds(30);

        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true
        };

        System.Diagnostics.Debug.WriteLine($"🌐 ApiClient BaseAddress: {ApiConfig.CurrentBaseUrl}");
    }

    public void UpdateBaseUrl()
    {
        _httpClient.BaseAddress = new Uri(ApiConfig.CurrentBaseUrl);
        System.Diagnostics.Debug.WriteLine($"🌐 ApiClient BaseAddress updated: {ApiConfig.CurrentBaseUrl}");
    }

    // ===== GET =====
    public async Task<T> GetAsync<T>(string endpoint)
    {
        try
        {
            // ✅ Убираем лишние слеши
            if (endpoint.StartsWith("/"))
                endpoint = endpoint.Substring(1);

            var fullUrl = $"{_httpClient.BaseAddress}{endpoint}";
            System.Diagnostics.Debug.WriteLine($"🌐 GET: {fullUrl}");

            var response = await _httpClient.GetAsync(endpoint);
            return await HandleResponse<T>(response);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Ошибка GET: {ex.Message}");
            throw;
        }
    }

    // ===== POST =====
    public async Task<T> PostAsync<T>(string endpoint, object data = null)
    {
        if (endpoint.StartsWith("/"))
            endpoint = endpoint.Substring(1);

        var json = data != null ? JsonSerializer.Serialize(data, _jsonOptions) : "{}";
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync(endpoint, content);
        return await HandleResponse<T>(response);
    }

    // ===== PUT =====
    public async Task<T> PutAsync<T>(string endpoint, object data = null)
    {
        if (endpoint.StartsWith("/"))
            endpoint = endpoint.Substring(1);

        var json = data != null ? JsonSerializer.Serialize(data, _jsonOptions) : "{}";
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await _httpClient.PutAsync(endpoint, content);
        return await HandleResponse<T>(response);
    }

    // ===== DELETE =====
    public async Task DeleteAsync(string endpoint)
    {
        if (endpoint.StartsWith("/"))
            endpoint = endpoint.Substring(1);

        var response = await _httpClient.DeleteAsync(endpoint);
        await HandleResponse<object>(response);
    }

    // ===== PRIVATE =====
    private async Task<T> HandleResponse<T>(HttpResponseMessage response)
    {
        var content = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            if (typeof(T) == typeof(object))
            {
                return default;
            }
            return JsonSerializer.Deserialize<T>(content, _jsonOptions);
        }

        System.Diagnostics.Debug.WriteLine($"❌ API Error ({response.StatusCode}): {content}");
        throw new HttpRequestException($"API Error ({response.StatusCode}): {content}");
    }

    public void Dispose()
    {
        _httpClient?.Dispose();
    }
}