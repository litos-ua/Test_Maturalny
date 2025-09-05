using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class ForgotPasswordRequestDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
    }
}
