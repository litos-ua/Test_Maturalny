
using System.ComponentModel.DataAnnotations;

using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateUserDto
    {
        [Required]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Username { get; set; } = null!;

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = null!;

        [MaxLength(100)]
        public string? Fullname { get; set; }

        [Phone, MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(200)]
        public string? Address { get; set; }

        public UserRole Role { get; set; } = UserRole.Student;

        public bool EmailVerified { get; set; }

        public bool IsLocked { get; set; }
    }
}
