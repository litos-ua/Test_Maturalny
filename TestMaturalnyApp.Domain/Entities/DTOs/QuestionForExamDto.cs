using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class QuestionForExamDto
    {
        public int id { get; set; }
        public string Text { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public QuestionType Type { get; set; }
        public List<AnswerOptionForExamDto> Options { get; set; } = new();
    }

    public class AnswerOptionForExamDto
    {
        public int id { get; set; }
        public string Text { get; set; } = null!;
        public string? MatchLabel { get; set; }
        public string? Explanation { get; set; }

        public int QuestionId { get; set; }
        public Question Question { get; set; } = null!;
        public string? GroupKey { get; set; }
    }
}
