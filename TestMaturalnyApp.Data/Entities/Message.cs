using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Data.Entities
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public int SenderId { get; set; }
        public User Sender { get; set; } = null!;

        [Required]
        public int ReceiverId { get; set; }
        public User Receiver { get; set; } = null!;

        [Required, MaxLength(1000)]
        public string Content { get; set; } = null!;

        [Required]
        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReadAt { get; set; }
    }

}
