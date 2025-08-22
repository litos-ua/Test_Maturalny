
namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class TokenApiResponseDto
    {
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
        public UserRefreshResponseDto User { get; set; } = null!;
    }
}
