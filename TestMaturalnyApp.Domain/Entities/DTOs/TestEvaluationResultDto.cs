
//namespace TestMaturalnyApp.Domain.Entities.DTOs
//{
//    public class TestEvaluationResultDto
//    {
//        public int TestSessionId { get; set; }
//        public double TotalScore { get; set; }
//        public List<QuestionResultDto> Results { get; set; } = new();
//    }

//}

namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class TestEvaluationResultDto
    {
        public int TestSessionId { get; set; }
        public double TotalScore { get; set; }
        public string UserFullname { get; set; } = "";
        public DateTime StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public List<QuestionResultDto> Results { get; set; } = new();
    }


}
