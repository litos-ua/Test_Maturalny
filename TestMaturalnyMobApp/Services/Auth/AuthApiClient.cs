
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TestMaturalnyMobApp.Constants;
using TestMaturalnyMobApp.Models.DTOs.Auth;

namespace TestMaturalnyMobApp.Services.Auth;

public class AuthApiClient
{
    private readonly HttpClient _httpClient;
    private readonly JsonSerializerOptions _jsonOptions;

    public AuthApiClient()
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
    }

    // ===== Установка токена =====
    public void SetAuthorizationToken(string? token)
    {
        _httpClient.DefaultRequestHeaders.Authorization =
            string.IsNullOrEmpty(token)
                ? null
                : new AuthenticationHeaderValue("Bearer", token);
    }

    // ===== GET =====
    public async Task<T> GetAsync<T>(string endpoint, bool requireAuth = true)
    {
        try
        {
            if (endpoint.StartsWith("/"))
                endpoint = endpoint.Substring(1);

            var response = await _httpClient.GetAsync(endpoint);
            return await HandleResponse<T>(response);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Auth GET Error: {ex.Message}");
            throw;
        }
    }

    // ===== POST =====
    public async Task<T> PostAsync<T>(string endpoint, object data = null, bool requireAuth = false)
    {
        try
        {
            if (endpoint.StartsWith("/"))
                endpoint = endpoint.Substring(1);

            var json = data != null ? JsonSerializer.Serialize(data, _jsonOptions) : "{}";
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(endpoint, content);
            return await HandleResponse<T>(response);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Auth POST Error: {ex.Message}");
            throw;
        }
    }

    // ===== PUT =====
    public async Task<T> PutAsync<T>(string endpoint, object data = null, bool requireAuth = true)
    {
        try
        {
            if (endpoint.StartsWith("/"))
                endpoint = endpoint.Substring(1);

            var json = data != null ? JsonSerializer.Serialize(data, _jsonOptions) : "{}";
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync(endpoint, content);
            return await HandleResponse<T>(response);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Auth PUT Error: {ex.Message}");
            throw;
        }
    }

    // ===== DELETE =====
    public async Task DeleteAsync(string endpoint, bool requireAuth = true)
    {
        try
        {
            if (endpoint.StartsWith("/"))
                endpoint = endpoint.Substring(1);

            var response = await _httpClient.DeleteAsync(endpoint);
            await HandleResponse<object>(response);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Auth DELETE Error: {ex.Message}");
            throw;
        }
    }

    // ===== PRIVATE =====
    private async Task<T> HandleResponse<T>(HttpResponseMessage response)
    {
        var content = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            if (typeof(T) == typeof(object))
                return default;

            return JsonSerializer.Deserialize<T>(content, _jsonOptions) ?? default!;
        }

        // Обработка 401
        if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        {
            throw new UnauthorizedAccessException("Authentication required");
        }

        System.Diagnostics.Debug.WriteLine($"❌ Auth API Error ({response.StatusCode}): {content}");
        throw new HttpRequestException($"API Error ({response.StatusCode}): {content}");
    }

    public void Dispose()
    {
        _httpClient?.Dispose();
    }
}
