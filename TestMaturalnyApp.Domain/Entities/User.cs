using System.ComponentModel.DataAnnotations;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public string? Fullname { get; set; }

        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? PhoneNumber { get; set; } = string.Empty;

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
