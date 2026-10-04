namespace TestMaturalnyMobApp.Models.DTOs.Auth;
public class TokenRefreshResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public AuthUserDto? User { get; set; }
}
