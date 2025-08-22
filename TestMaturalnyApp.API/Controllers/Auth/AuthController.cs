using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Interfaces.Auth;
using TestMaturalnyApp.Domain.Entities.DTOs.Auth;
using TestMaturalnyApp.Services.Mapping.Dto.Auth;

namespace TestMaturalnyApp.API.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserTokenService _userTokenService;
        private readonly IAuthService _authService;

        public AuthController(
            IUserService userService,
            IUserTokenService userTokenService,
            IAuthService authService)
        {
            _userService = userService;
            _userTokenService = userTokenService;
            _authService = authService;
        }

        [HttpPost("register")]  // Вариант с DTO
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (await _userService.ExistsByEmailAsync(dto.Email))
                return Conflict("User with this email already exists.");

            var passwordHash = _authService.HashPassword(dto.PasswordHash);
            var user = RegisterUserDtoMapper.MapToDomain(dto, passwordHash);

            var created = await _userService.CreateAsync(user);

            return Ok(new { message = "User registered successfully", user = new { created.Id, created.Email, created.Role } });
        }



        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            var user = await _userService.GetByEmailAsync(loginDto.Email);
            if (user == null || !_authService.VerifyPassword(loginDto.PasswordHash, user.PasswordHash))
                return Unauthorized("Invalid email or password");

            // Очистка истёкших refresh-токенов (опционально)
            var userTokens = await _userTokenService.GetByUserIdAsync(user.Id);
            foreach (var token in userTokens)
            {
                if (token.ExpiresAt < DateTime.UtcNow)
                {
                    await _userTokenService.DeleteAsync(token.Id);
                }
            }

            // Проверяем, есть ли у пользователя активный refresh-токен
            var activeRefreshToken = (await _userTokenService.GetByUserIdAsync(user.Id))
                .FirstOrDefault(t => t.ExpiresAt > DateTime.UtcNow && t.IsActive);

            string accessToken, refreshToken;

            if (activeRefreshToken != null)
            {
                // Если есть валидный refresh-токен, используем его
                accessToken = _authService.GenerateJwtToken(user.Id, user.Email, user.Role);
                refreshToken = activeRefreshToken.Token;
            }
            else
            {
                // Если нет, генерируем новые
                accessToken = _authService.GenerateJwtToken(user.Id, user.Email, user.Role);
                refreshToken = _authService.GenerateRefreshToken();
                await _authService.SaveRefreshTokenAsync(user.Id, refreshToken);
            }

            var response = new
            {
                token = accessToken,
                refreshToken,
                user = new { user.Id, user.Email, user.Role, user.EmailVerified }
            };

            if (!user.EmailVerified)
            {
                // Пользователь вошёл, но не подтвердил email
                return StatusCode(206, response);
            }

            // Полная авторизация
            return Ok(response);

        }




        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutRequestDto request)
        {
            var result = await _authService.RevokeRefreshTokenAsync(request.AccessToken);
            return result ? Ok("Logged out") : BadRequest("Logout failed");
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh([FromBody] TokenApiRequestDto dto)
        {
            var result = await _authService.RefreshTokensAsync(dto.AccessToken, dto.RefreshToken);
            if (result == null) return Unauthorized("Invalid token pair");

            var user = await _userService.GetByEmailAsync(result.User.Email);
            if (user == null) return Unauthorized("User not found");

            var userDto = new UserRefreshResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                EmailVerified = user.EmailVerified
            };

            return Ok(new
            {
                accessToken = result.AccessToken,
                refreshToken = result.RefreshToken,
                user = userDto
            });
        }



        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto dto)
        {
            var token = await _authService.GeneratePasswordResetTokenAsync(dto.Email);
            if (token == null)
                return NotFound("User not found");

            // Отправить email или вернуть токен в ответ (если email не реализован)
            return Ok(new { token });
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto dto)
        {
            var success = await _authService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            return success ? Ok("Password has been reset") : BadRequest("Invalid or expired token");
        }
    }
}





