namespace TestMaturalnyMobApp.Models.DTOs.Auth
{
    public class RegisterUserDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
