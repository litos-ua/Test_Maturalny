
namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class LogoutRequestDto
    {
        public string AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
