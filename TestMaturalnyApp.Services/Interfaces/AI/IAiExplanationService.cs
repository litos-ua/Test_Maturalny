
namespace TestMaturalnyApp.Services.Interfaces.AI
{
    /// <summary>
    /// Сервис для генерации AI-пояснений к учебным вопросам
    /// </summary>
    public interface IAiExplanationService
    {
        /// <summary>
        /// Генерирует понятное объяснение для правильного ответа
        /// </summary>
        Task<string> GenerateExplanationAsync(string questionText, string correctAnswer, string questionType);
    }
}
