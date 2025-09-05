using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface IUserAnswerService
    {
        Task<IEnumerable<UserAnswerDto>> GetBySessionIdAsync(int sessionId);
        Task<UserAnswerDto?> GetByIdAsync(int id);
        Task<UserAnswerDto> CreateAsync(CreateUserAnswerDto dto);
        Task UpdateAsync(UpdateUserAnswerDto dto);
        Task AddRangeAsync(IEnumerable<CreateUserAnswerDto> dtos);
        Task<bool> DeleteAsync(int id);
    }

}
