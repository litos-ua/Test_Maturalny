using TestMaturalnyMobApp;

namespace TestMaturalnyMobApp.Models.DTOs.Auth;
public class TokenApiResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public string? ExpiresAt { get; set; }
    public AuthUserDto? User { get; set; }
}
