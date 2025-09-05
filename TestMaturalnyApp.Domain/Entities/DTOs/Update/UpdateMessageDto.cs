namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateMessageDto
    {
        public int Id { get; set; }
        public int ReceiverId { get; set; }
        public string Content { get; set; } = null!;
    }
}
