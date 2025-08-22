
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Data.Entities
{
    public class UserToken
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required, MaxLength(500)]
        public string Token { get; set; } = null!; // Хранится RefreshToken

        [Required]
        public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddDays(1); // Срок действия токена (по умолчанию 1 день)

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Дата создания токена (по умолчанию текущая)

        [StringLength(45)] // Длина IP-адреса IPv4/IPv6
        public string? CreatedByIp { get; set; }

        public DateTime? RevokedAt { get; set; } // Дата отзыва токена (может быть null)

        [StringLength(45)] // Длина IP-адреса IPv4/IPv6
        public string? RevokedByIp { get; set; }  // IP-адрес, с которого токен был отозван

        [NotMapped] // Это поле не будет сохранено в базе данных
        public bool IsActive => RevokedAt == null && DateTime.UtcNow < ExpiresAt; // Проверка активности токена
        
        [ForeignKey("UserId")] // Навигационное свойство для связи с пользователем
        public User User { get; set; } = null!;
    }

}
