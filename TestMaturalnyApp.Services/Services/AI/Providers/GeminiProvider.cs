using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TestMaturalnyApp.Services.Interfaces.AI;

namespace TestMaturalnyApp.Services.Services.AI.Providers
{
    public class GeminiProvider : IAiProvider
    {
        private readonly HttpClient _httpClient;
        private readonly ProviderConfig? _config;
        private readonly ILogger<GeminiProvider> _logger;

        public string Name => "Gemini";

        public GeminiProvider(
            HttpClient httpClient,
            IOptions<AiOptions> options,
            ILogger<GeminiProvider> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

            // Получаем конфигурацию для Gemini из словаря Providers
            var aiOptions = options.Value;
            _config = aiOptions.Providers.GetValueOrDefault("Gemini");
        }

        public async Task<string> GenerateExplanationAsync(string prompt, CancellationToken cancellationToken = default)
        {
            // Проверка конфигурации
            if (_config == null || !_config.Enabled || string.IsNullOrEmpty(_config.ApiKey))
            {
                _logger.LogWarning("Gemini provider is not configured or disabled");
                return null;
            }

            try
            {
                var requestBody = new
                {
                    contents = new[]
                    {
                        new
                        {
                            parts = new[] { new { text = prompt } }
                        }
                    },
                    generationConfig = new
                    {
                        temperature = 0.7,
                        maxOutputTokens = 500
                    }
                };

                // Gemini использует API ключ в URL
                var url = $"{_config.ApiUrl}?key={_config.ApiKey}";
                var requestJson = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(requestJson, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(url, content, cancellationToken);
                var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Gemini API error: {StatusCode}, {Error}", response.StatusCode, responseJson);
                    return null;
                }

                using var doc = JsonDocument.Parse(responseJson);

                // Проверяем наличие ошибки в ответе
                if (doc.RootElement.TryGetProperty("error", out _))
                {
                    _logger.LogWarning("Gemini API returned an error: {Response}", responseJson);
                    return null;
                }

                var explanation = doc.RootElement
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                return explanation?.Trim();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Gemini API exception");
                return null;
            }
        }

        public Task<bool> IsAvailableAsync()
        {
            return Task.FromResult(_config?.Enabled == true && !string.IsNullOrEmpty(_config.ApiKey));
        }
    }
}