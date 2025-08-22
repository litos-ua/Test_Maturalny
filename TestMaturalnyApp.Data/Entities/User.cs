
using System.ComponentModel.DataAnnotations;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Data.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Username { get; set; } = null!;

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;

        [MaxLength(100)]
        public string? Fullname { get; set; }

        [MaxLength(200)]
        public string? Address { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Phone, MaxLength(20)]
        public string? PhoneNumber { get; set; } = string.Empty;

        [Required]
        public UserRole Role { get; set; } = UserRole.Student;

        public bool EmailVerified { get; set; } = false;

        public bool IsLocked { get; set; } = false;

        public DateTime? LockoutEnd { get; set; }

        public int AccessFailedCount { get; set; } = 0;

        public DateTime? LastLogin { get; set; }

        public string? PasswordResetToken { get; set; }

        public DateTime? PasswordResetExpires { get; set; }

        public ICollection<UserToken> UserTokens { get; set; } = new List<UserToken>();
        public UserOption? Option { get; set; }

    }

}
