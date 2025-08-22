
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Services.Mapping.Dto.Create
{
    public static class UpdateUserDtoMapper
    {
        public static void MapToExistingDomain(CreateUserDto dto, User user)
        {
            user.Username = dto.Username;
            user.Email = dto.Email;
            user.Fullname = dto.Fullname;
            user.Address = dto.Address;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = dto.Role;
        }
    }
}
