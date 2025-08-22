using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;

namespace TestMaturalnyApp.Services.Mapping.Dto.Update
{
    public static class UpdateUserDtoMapper
    {
        public static void MapToExistingDomain(UpdateUserDto dto, User user)
        {
            user.Id = dto.Id;
            user.Username = dto.Username;
            user.Email = dto.Email;
            user.Fullname = dto.Fullname;
            user.Address = dto.Address;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = dto.Role;
            user.EmailVerified = dto.EmailVerified;
            user.IsLocked = dto.IsLocked;
        }
    }
}
