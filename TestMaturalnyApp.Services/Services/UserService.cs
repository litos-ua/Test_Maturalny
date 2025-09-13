using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Domain.Entities.DTOs.Models;

namespace TestMaturalnyApp.Services.Services
{
    public class UserService : IUserService, IUserAdminService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserAdminRepository _userAdminRepository;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, IUserAdminRepository userAdminRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _userAdminRepository = userAdminRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            try
            {
                var dataEntities = await _userRepository.GetAllAsync();
                return dataEntities.Select(UserMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving all users.");
                throw new ApplicationException("Failed to retrieve all users.", ex);
            }
        }

        // Для админ

        public async Task<PagedResult<UserDto>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy,
            string? sortOrder,
            string? filterJson)
        {
            try
            {
                var pagedData = await _userAdminRepository.GetPagedAsync(
                    pageNumber,
                    pageSize,
                    sortBy,
                    sortOrder,
                    filterJson);

                return new PagedResult<UserDto>
                {
                    Items = pagedData.Items
                        .Select(UserMapper.MapToDomain) // Data -> Domain
                        .Select(UserMapper.MapToDto)    // Domain -> DTO
                        .ToList(),
                    TotalCount = pagedData.TotalCount,
                    PageNumber = pagedData.PageNumber,
                    PageSize = pagedData.PageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting paged users");
                throw new ApplicationException("Failed to get paged users", ex);
            }
        }


        public async Task<IEnumerable<ConversationUserDto>> GetAllowedContactsAsync(int currentUserId)
        {
            // Получаем текущего пользователя (его роль)
            var currentUser = await _userRepository.GetByIdAsync(currentUserId);
            if (currentUser == null)
                return Enumerable.Empty<ConversationUserDto>();

            var users = await _userRepository.GetAllowedContactsAsync(currentUserId, currentUser.Role);

            return users.Select(u => new ConversationUserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Fullname = u.Fullname,
                Role = u.Role
            });
        }


        public async Task<User?> GetByIdAsync(int id)
        {
            try
            {
                var userData = await _userRepository.GetByIdAsync(id);
                return userData == null ? null : UserMapper.MapToDomain(userData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving the user with ID {id}.");
                throw new ApplicationException($"Failed to retrieve the user with ID {id}.", ex);
            }
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            try
            {
                var userData = await _userRepository.GetByEmailAsync(email);
                return userData == null ? null : UserMapper.MapToDomain(userData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving the user with email {email}.");
                throw new ApplicationException($"Failed to retrieve the user with email {email}.", ex);
            }
        }

        public async Task<User> CreateAsync(User domainUser)
        {
            try
            {
                var dataUser = UserMapper.MapToData(domainUser);
                await _userRepository.CreateAsync(dataUser);
                domainUser.Id = dataUser.Id;
                return domainUser;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a new user.");
                throw new ApplicationException("Failed to create a new user.", ex);
            }
        }

        public async Task UpdateAsync(User domainUser)
        {
            try
            {
                var dataUser = UserMapper.MapToData(domainUser);
                await _userRepository.UpdateAsync(dataUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while updating the user with ID {domainUser.Id}.");
                throw new ApplicationException($"Failed to update the user with ID {domainUser.Id}.", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                await _userRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while deleting the user with ID {id}.");
                throw new ApplicationException($"Failed to delete the user with ID {id}.", ex);
            }
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            try
            {
                return await _userRepository.ExistsByEmailAsync(email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while checking if a user exists with email {email}.");
                throw new ApplicationException($"Failed to check if a user exists with email {email}.", ex);
            }
        }
    }
}
