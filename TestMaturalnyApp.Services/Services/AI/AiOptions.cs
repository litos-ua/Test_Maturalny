namespace TestMaturalnyApp.Services.Services
{
    public class AiOptions
    {
        // Какой провайдер использовать сейчас (Gemini, Groq, OpenAI, Ollama)
        public string ActiveProvider { get; set; } = "Groq";
        public Dictionary<string, ProviderConfig> Providers { get; set; } = new();

        // Конфигурации для разных провайдеров
        public ProviderConfig Gemini { get; set; } = new();
        public ProviderConfig Groq { get; set; } = new();
        public ProviderConfig OpenAI { get; set; } = new();
        public ProviderConfig Ollama { get; set; } = new();

        // Общие настройки
        public int MaxTokens { get; set; } = 500;
    }

    public class ProviderConfig
    {
        public string ApiUrl { get; set; } = "";
        public string ApiKey { get; set; } = "";
        public string Model { get; set; } = "";
        public bool Enabled { get; set; } = true;
    }
}
