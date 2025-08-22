
//namespace TestMaturalnyApp.Domain.Entities.DTOs
//{
//    public class QuestionResultDto
//    {
//        public int QuestionId { get; set; }
//        public List<int> SelectedOptionIds { get; set; } = new();
//        public List<int> CorrectOptionIds { get; set; } = new();
//        public bool IsCorrect { get; set; }
//        public double Score { get; set; }
//    }

//}

namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class QuestionResultDto
    {
        public int QuestionId { get; set; }
        public List<int> SelectedOptionIds { get; set; } = new();
        public List<int> CorrectOptionIds { get; set; } = new();
        public bool IsCorrect { get; set; }
        public bool IsPartiallyCorrect { get; set; }
        public double Score { get; set; }

        public int QuestionOrder { get; set; }
        public string QuestionText { get; set; } = "";
        public string QuestionType { get; set; } = "";
    }


}

