using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;
using Microsoft.Extensions.Logging;

namespace TestMaturalnyApp.Services.Services
{
    public class UserOptionService : IUserOptionService
    {
        private readonly IUserOptionRepository _optionRepository;
        private readonly ILogger<UserOptionService> _logger;

        public UserOptionService(IUserOptionRepository optionRepository, ILogger<UserOptionService> logger)
        {
            _optionRepository = optionRepository;
            _logger = logger;
        }

        public async Task<UserOption?> GetByUserIdAsync(int userId)
        {
            try
            {
                var entity = await _optionRepository.GetByUserIdAsync(userId);
                return entity == null ? null : UserOptionMapper.MapToDomain(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving user options for User ID {userId}.");
                throw new ApplicationException($"Failed to retrieve user options for User ID {userId}.", ex);
            }
        }

        public async Task<UserOption?> GetByIdAsync(int id)
        {
            try
            {
                var entity = await _optionRepository.GetByIdAsync(id);
                return entity == null ? null : UserOptionMapper.MapToDomain(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving the user option with ID {id}.");
                throw new ApplicationException($"Failed to retrieve the user option with ID {id}.", ex);
            }
        }

        public async Task<UserOptionDto> CreateAsync(CreateUserOptionDto dto)
        {
            try
            {
                if (!await _optionRepository.UserExistsAsync(dto.UserId))
                {
                    _logger.LogWarning($"Attempted to create user option for non-existing User ID {dto.UserId}.");
                    throw new ApplicationException("User does not exist.");
                }

                var domain = CreateUserOptionDtoMapper.MapToDomain(dto); // DTO → Domain
                var dataEntity = UserOptionMapper.MapToData(domain);     // Domain → Data

                await _optionRepository.CreateAsync(dataEntity);         // Save to DB

                var domainFromDb = UserOptionMapper.MapToDomain(dataEntity); // Data → Domain
                return UserOptionDtoMapper.MapToDto(domainFromDb);            // Domain → DTO
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while creating a user option for User ID {dto.UserId}.");
                throw new ApplicationException($"Failed to create a user option for User ID {dto.UserId}.", ex);
            }
        }

        public async Task UpdateAsync(UpdateUserOptionDto dto)
        {
            try
            {
                var domain = UpdateUserOptionDtoMapper.MapToDomain(dto);
                var dataEntity = UserOptionMapper.MapToData(domain);
                await _optionRepository.UpdateAsync(dataEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while updating user option with ID {dto.Id}.");
                throw new ApplicationException($"Failed to update the user option with ID {dto.Id}.", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                await _optionRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while deleting user option with ID {id}.");
                throw new ApplicationException($"Failed to delete the user option with ID {id}.", ex);
            }
        }
    }
}

