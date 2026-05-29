using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TestMaturalnyApp.Services.Interfaces.AI;

namespace TestMaturalnyApp.Services.Services.AI.Providers
{
    public class GroqProvider : IAiProvider
    {
        private readonly HttpClient _httpClient;
        private readonly ProviderConfig? _config;
        private readonly ILogger<GroqProvider> _logger;

        public string Name => "Groq";

        public GroqProvider(
            HttpClient httpClient,
            IOptions<AiOptions> options,
            ILogger<GroqProvider> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

            // Получаем конфигурацию для Groq из словаря Providers
            var aiOptions = options.Value;
            _config = aiOptions.Providers.GetValueOrDefault("Groq");

            // Устанавливаем заголовок авторизации, если ключ есть
            if (_config?.Enabled == true && !string.IsNullOrEmpty(_config.ApiKey))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_config.ApiKey}");
            }
        }

        public async Task<string> GenerateExplanationAsync(string prompt, CancellationToken cancellationToken = default)
        {
            // Проверка конфигурации
            if (_config == null || !_config.Enabled || string.IsNullOrEmpty(_config.ApiKey))
            {
                _logger.LogWarning("Groq provider is not configured or disabled");
                return null;
            }

            try
            {
                var requestBody = new
                {
                    model = _config.Model ?? "llama-3.1-8b-instant",
                    messages = new[]
                    {
                        new { role = "user", content = prompt }
                    },
                    max_tokens = 500,
                    temperature = 0.7
                };

                var requestJson = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(requestJson, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(_config.ApiUrl, content, cancellationToken);
                var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Groq API error: {StatusCode}, {Error}", response.StatusCode, responseJson);
                    return null;
                }

                using var doc = JsonDocument.Parse(responseJson);
                var explanation = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                return explanation?.Trim();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Groq API exception");
                return null;
            }
        }

        public Task<bool> IsAvailableAsync()
        {
            return Task.FromResult(_config?.Enabled == true && !string.IsNullOrEmpty(_config.ApiKey));
        }
    }
}