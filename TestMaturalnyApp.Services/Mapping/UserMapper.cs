
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Services.Mapping
{
    public static class UserMapper
    {
        public static Domain.Entities.User MapToDomain(Data.Entities.User data) => new()
        {
            Id = data.Id,
            Username = data.Username,
            Email = data.Email,
            PasswordHash = data.PasswordHash,
            Fullname = data.Fullname,
            Address = data.Address,
            CreatedAt = data.CreatedAt,
            PhoneNumber = data.PhoneNumber,
            Role = data.Role,
            EmailVerified = data.EmailVerified,
            IsLocked = data.IsLocked,
            LockoutEnd = data.LockoutEnd,
            AccessFailedCount = data.AccessFailedCount,
            LastLogin = data.LastLogin,
            PasswordResetToken = data.PasswordResetToken,
            PasswordResetExpires = data.PasswordResetExpires,
            UserTokens = data.UserTokens.Select(UserTokenMapper.MapToDomain).ToList()
        };

        public static Data.Entities.User MapToData(Domain.Entities.User domain) => new()
        {
            Id = domain.Id,
            Username = domain.Username,
            Email = domain.Email,
            PasswordHash = domain.PasswordHash,
            Fullname = domain.Fullname,
            Address = domain.Address,
            CreatedAt = domain.CreatedAt,
            PhoneNumber = domain.PhoneNumber,
            Role = domain.Role,
            EmailVerified = domain.EmailVerified,
            IsLocked = domain.IsLocked,
            LockoutEnd = domain.LockoutEnd,
            AccessFailedCount = domain.AccessFailedCount,
            LastLogin = domain.LastLogin,
            PasswordResetToken = domain.PasswordResetToken,
            PasswordResetExpires = domain.PasswordResetExpires,
            UserTokens = domain.UserTokens.Select(UserTokenMapper.MapToData).ToList()
        };

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
    }
}
