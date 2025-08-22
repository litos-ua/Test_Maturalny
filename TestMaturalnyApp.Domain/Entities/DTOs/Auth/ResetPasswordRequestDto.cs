using System.ComponentModel.DataAnnotations;


namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class ResetPasswordRequestDto
    {
        [Required]
        public string Token { get; set; } = null!;

        [Required, MinLength(8)]
        public string NewPassword { get; set; } = null!;
    }
}
