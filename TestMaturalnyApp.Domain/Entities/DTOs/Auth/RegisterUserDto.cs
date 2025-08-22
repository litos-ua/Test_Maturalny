using System.ComponentModel.DataAnnotations;


namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class RegisterUserDto
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(8)]
        public string PasswordHash { get; set; } = null!;

        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
