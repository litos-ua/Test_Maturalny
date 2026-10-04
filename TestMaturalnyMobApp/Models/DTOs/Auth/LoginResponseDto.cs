namespace TestMaturalnyMobApp.Models.DTOs.Auth;
public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public AuthUserDto? User { get; set; }
}