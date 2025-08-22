using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Services.Mapping.Dto
{
    public static class UserDtoMapper
    {
        public static UserDto MapToDto(User user) => new()
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Fullname = user.Fullname,
            Address = user.Address,
            PhoneNumber = user.PhoneNumber,
            Role = user.Role,
            EmailVerified = user.EmailVerified,
            IsLocked = user.IsLocked
        };

        public static User MapToDomain(CreateUserDto dto, string passwordHash) => new()
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = passwordHash,
            Fullname = dto.Fullname,
            Address = dto.Address,
            PhoneNumber = dto.PhoneNumber,
            Role = dto.Role,
            EmailVerified = false,
            IsLocked = false
        };
    }
}
