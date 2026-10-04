namespace TestMaturalnyMobApp.Models.DTOs.Auth;
public class LogoutRequestDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string? RefreshToken { get; set; }
}
