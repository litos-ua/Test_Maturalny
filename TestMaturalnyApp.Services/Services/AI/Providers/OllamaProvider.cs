using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TestMaturalnyApp.Services.Interfaces.AI;

namespace TestMaturalnyApp.Services.Services.AI.Providers
{
    public class OllamaProvider : IAiProvider
    {
        private readonly HttpClient _httpClient;
        private readonly ProviderConfig? _config;
        private readonly ILogger<OllamaProvider> _logger;

        public string Name => "Ollama";

        public OllamaProvider(
            HttpClient httpClient,
            IOptions<AiOptions> options,
            ILogger<OllamaProvider> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _config = options.Value.Providers.GetValueOrDefault("Ollama");
        }

        public async Task<string> GenerateExplanationAsync(string prompt, CancellationToken cancellationToken = default)
        {
            // Проверка конфигурации
            if (_config == null || !_config.Enabled)
            {
                _logger.LogWarning("Ollama provider is not configured or disabled");
                return null;
            }

            try
            {
                // Ollama использует другой формат запроса
                var requestBody = new
                {
                    model = _config.Model ?? "llama3.2:3b",
                    prompt = prompt,
                    stream = false,
                    options = new
                    {
                        temperature = 0.7,
                        num_predict = 500
                    }
                };

                var requestJson = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(requestJson, Encoding.UTF8, "application/json");

                // Ollama не требует авторизации
                _httpClient.DefaultRequestHeaders.Clear();

                var response = await _httpClient.PostAsync(_config.ApiUrl, content, cancellationToken);
                var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Ollama API error: {StatusCode}, {Error}", response.StatusCode, responseJson);
                    return null;
                }

                using var doc = JsonDocument.Parse(responseJson);
                var explanation = doc.RootElement
                    .GetProperty("response")
                    .GetString();

                return explanation?.Trim();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ollama API exception");
                return null;
            }
        }

        public Task<bool> IsAvailableAsync()
        {
            try
            {
                // Быстрая проверка доступности Ollama сервера
                return Task.FromResult(_config?.Enabled == true && !string.IsNullOrEmpty(_config.ApiUrl));
            }
            catch
            {
                return Task.FromResult(false);
            }
        }
    }
}
