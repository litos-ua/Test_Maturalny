using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Interfaces.Auth;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping.Dto.Update;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,Teacher,Student")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;
    private readonly ILogger<UserController> _logger;

    public UserController(IUserService userService, IAuthService authService, ILogger<UserController> logger)
    {
        _userService = userService;
        _authService = authService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var users = await _userService.GetAllAsync();
            var userDtos = users.Select(UserDtoMapper.MapToDto);
            return Ok(userDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while retrieving all users.");
            return StatusCode(500, "An error occurred while retrieving the list of users.");
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
                return NotFound($"User with ID {id} was not found.");

            return Ok(UserDtoMapper.MapToDto(user));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while retrieving user with ID {UserId}.", id);
            return StatusCode(500, $"An error occurred while retrieving the user with ID {id}.");
        }
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            var email = User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
                return Unauthorized("Access token does not contain email.");

            var user = await _userService.GetByEmailAsync(email);
            if (user == null)
                return NotFound("User not found.");

            var userDto = new UserDto
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

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while retrieving the current user profile.");
            return StatusCode(500, "An error occurred while retrieving the current user profile.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _userService.ExistsByEmailAsync(dto.Email))
                return Conflict("User with this email already exists.");

            var passwordHash = _authService.HashPassword(dto.Password);
            var domainUser = UserDtoMapper.MapToDomain(dto, passwordHash);

            var created = await _userService.CreateAsync(domainUser);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, UserDtoMapper.MapToDto(created));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while creating a new user.");
            return StatusCode(500, "An error occurred while creating the user.");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserDto dto)
    {
        try
        {
            if (id != dto.Id)
                return BadRequest("ID mismatch.");

            var existing = await _userService.GetByIdAsync(id);
            if (existing == null)
                return NotFound($"User with ID {id} was not found.");

            UpdateUserDtoMapper.MapToExistingDomain(dto, existing);
            await _userService.UpdateAsync(existing);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while updating user with ID {UserId}.", id);
            return StatusCode(500, $"An error occurred while updating the user with ID {id}.");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var existing = await _userService.GetByIdAsync(id);
            if (existing == null)
                return NotFound($"User with ID {id} was not found.");

            await _userService.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while deleting user with ID {UserId}.", id);
            return StatusCode(500, $"An error occurred while deleting the user with ID {id}.");
        }
    }
}
