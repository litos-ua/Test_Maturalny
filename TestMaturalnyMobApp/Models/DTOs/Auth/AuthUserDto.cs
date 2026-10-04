using TestMaturalnyMobApp.Models.Enums;

namespace TestMaturalnyMobApp.Models.DTOs.Auth;

public class AuthUserDto
  {
     public int Id { get; set; }
     public string Email { get; set; }
    public string Username { get; set; } = string.Empty;
    public UserRole Role { get; set; }
     public bool EmailVerified { get; set; }
  }

