
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IUserOptionService
    {
        Task<UserOption?> GetByUserIdAsync(int userId);
        Task<UserOption?> GetByIdAsync(int id);
        Task<UserOptionDto> CreateAsync(CreateUserOptionDto dto);
        Task UpdateAsync(UpdateUserOptionDto dto);
        Task DeleteAsync(int id);
    }

}
