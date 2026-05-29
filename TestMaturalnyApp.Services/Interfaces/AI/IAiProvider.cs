namespace TestMaturalnyApp.Services.Interfaces.AI
{
    /// <summary>
    /// Интерфейс для конкретного AI-провайдера (Groq, Gemini, OpenAI)
    /// </summary>
    public interface IAiProvider
    {
        /// <summary>
        /// Имя провайдера (Gemini, Groq, OpenAI и т.д.)
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Генерация ответа на промпт
        /// </summary>
        Task<string> GenerateExplanationAsync(string prompt, CancellationToken cancellationToken = default);

        /// <summary>
        /// Проверка доступности провайдера
        /// </summary>
        Task<bool> IsAvailableAsync();
    }
}
