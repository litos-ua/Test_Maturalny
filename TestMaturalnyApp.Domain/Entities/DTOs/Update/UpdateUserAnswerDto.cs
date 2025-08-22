

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateUserAnswerDto
    {
        public int Id { get; set; }  
        public int QuestionId { get; set; }
        public string? Explanation { get; set; }
        public List<int> SelectedOptionIds { get; set; } = new();
        public int? TestSessionId { get; set; }
    }
}
