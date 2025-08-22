using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string PasswordHash { get; set; }
    }
}
