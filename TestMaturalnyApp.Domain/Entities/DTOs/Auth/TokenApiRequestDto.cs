using System.ComponentModel.DataAnnotations;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class TokenApiRequestDto
    {
        [Required(ErrorMessage = "Access Token is required")]
        public string AccessToken { get; set; }

        [Required(ErrorMessage = "Refresh Token is required")]
        public string RefreshToken { get; set; }
    }
}
