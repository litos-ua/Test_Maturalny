using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Auth
{
    public class UserRefreshResponseDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public UserRole Role { get; set; }
        public bool EmailVerified { get; set; }
    }
}
