using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TestMaturalnyApp.Services.Interfaces.AI;

namespace TestMaturalnyApp.Services.Services.AI
{
    public class AiExplanationService : IAiExplanationService
    {
        private readonly IEnumerable<IAiProvider> _providers;
        private readonly AiOptions _options;
        private readonly ILogger<AiExplanationService> _logger;
        private IAiProvider _activeProvider;

        public AiExplanationService(
            IEnumerable<IAiProvider> providers,
            IOptions<AiOptions> options,
            ILogger<AiExplanationService> logger)
        {
            _providers = providers;
            _options = options.Value;
            _logger = logger;
            InitializeActiveProvider();
        }

        private void InitializeActiveProvider()
        {
            _activeProvider = _providers.FirstOrDefault(p =>
                p.Name.Equals(_options.ActiveProvider, StringComparison.OrdinalIgnoreCase));

            if (_activeProvider == null)
            {
                _logger.LogWarning("Active provider {Provider} not found, using first available", _options.ActiveProvider);
                _activeProvider = _providers.FirstOrDefault();
            }

            _logger.LogInformation("AI Provider initialized: {Provider}", _activeProvider?.Name ?? "None");
        }

        public async Task<string> GenerateExplanationAsync(string questionText, string correctAnswer, string questionType)
        {
            if (_activeProvider == null)
            {
                _logger.LogError("No AI provider available");
                return GetFallbackExplanation(correctAnswer);
            }

            var prompt = BuildPrompt(questionText, correctAnswer, questionType);

            try
            {
                var explanation = await _activeProvider.GenerateExplanationAsync(prompt);

                if (string.IsNullOrEmpty(explanation))
                {
                    // Пробуем использовать fallback-провайдера
                    return await TryFallbackProvider(correctAnswer);
                }

                return explanation;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating explanation with {Provider}", _activeProvider.Name);
                var fallbackExplanation = await TryFallbackProvider(correctAnswer);
                return fallbackExplanation ?? GetFallbackExplanation(correctAnswer);
            }
        }

        private async Task<string> TryFallbackProvider(string correctAnswer)
        {
            foreach (var provider in _providers.Where(p => p != _activeProvider))
            {
                _logger.LogInformation("Trying fallback provider: {Provider}", provider.Name);
                var result = await provider.GenerateExplanationAsync("Тестовий запит для перевірки доступності");
                if (!string.IsNullOrEmpty(result))
                {
                    _logger.LogInformation("Fallback provider {Provider} is available", provider.Name);
                    _activeProvider = provider;
                    return result;
                }
            }
            return null;
        }

        private string BuildPrompt(string question, string answer, string type)
        {
            return $@"Ти — асистент для підготовки до НМТ з історії України.

Питання: {question}
Правильна відповідь: {answer}
Тип питання: {type}

Завдання: Напиши коротке, зрозуміле пояснення (2-3 речення) українською мовою, чому ця відповідь правильна.
Пояснення має бути навчальним, точним і лаконічним.";
        }

        private string GetFallbackExplanation(string correctAnswer)
        {
            return $"Правильна відповідь: {correctAnswer}. Детальне пояснення тимчасово недоступне.";
        }
    }
}
