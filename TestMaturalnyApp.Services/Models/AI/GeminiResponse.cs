using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestMaturalnyApp.Services.Models.AI
{
    /// <summary>
    /// Модель ответа от Google Gemini API
    /// </summary>
    public class GeminiResponse
    {
        public List<GeminiCandidate>? Candidates { get; set; }
        public PromptFeedback? PromptFeedback { get; set; }
    }

    public class GeminiCandidate
    {
        public GeminiContent? Content { get; set; }
        public string? FinishReason { get; set; }
        public int Index { get; set; }
        public List<SafetyRating>? SafetyRatings { get; set; }
    }

    public class GeminiContent
    {
        public List<GeminiPart>? Parts { get; set; }
        public string? Role { get; set; }
    }

    public class GeminiPart
    {
        public string? Text { get; set; }
    }

    public class SafetyRating
    {
        public string? Category { get; set; }
        public string? Probability { get; set; }
    }

    public class PromptFeedback
    {
        public List<SafetyRating>? SafetyRatings { get; set; }
    }
}