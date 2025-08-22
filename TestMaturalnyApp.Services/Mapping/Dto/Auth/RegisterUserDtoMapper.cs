// Services/Mapping/Dto/Auth/RegisterUserDtoMapper.cs
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Entities.DTOs.Auth;

namespace TestMaturalnyApp.Services.Mapping.Dto.Auth
{
    public static class RegisterUserDtoMapper
    {
        public static User MapToDomain(RegisterUserDto dto, string passwordHash)
        {
            return new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = passwordHash,
                Fullname = dto.Fullname,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                Role = UserRole.Student, 
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}

