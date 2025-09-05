namespace TestMaturalnyApp.Domain.Entities.DTOs.Create
{
    public class CreateMessageDto
    {
        public int ReceiverId { get; set; }
        public string Content { get; set; } = null!;
    }
}
