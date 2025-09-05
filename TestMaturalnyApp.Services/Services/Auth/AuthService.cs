using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Domain.Entities.DTOs.Auth;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Services.Interfaces.Auth;
using TestMaturalnyApp.Services.Mapping;

namespace TestMaturalnyApp.Services.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IUserTokenRepository _userTokenRepository;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            IConfiguration configuration,
            IUserRepository userRepository,
            IUserTokenRepository userTokenRepository,
            ILogger<AuthService> logger)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _userTokenRepository = userTokenRepository;
            _logger = logger;
        }

        public string HashPassword(string password)
        {
            try
            {
                using var sha256 = SHA256.Create();
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error hashing password.");
                throw new Exception("An error occurred while hashing the password.");
            }
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            try
            {
                return HashPassword(password) == hashedPassword;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying password.");
                throw new Exception("An error occurred while verifying the password.");
            }
        }

        public string GenerateJwtToken(int userId, string email, UserRole role)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(GetJwtSecretKey());

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, userId.ToString()), // 🔹 добавлено
                        new Claim(ClaimTypes.Email, email),
                        new Claim(ClaimTypes.Role, role.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"]
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating JWT token for user {UserId}", userId);
                throw new Exception("An error occurred while generating the JWT token.");
            }
        }

        public string GenerateRefreshToken()
        {
            try
            {
                var randomNumber = new byte[32];
                using var rng = RandomNumberGenerator.Create();
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating refresh token.");
                throw new Exception("An error occurred while generating the refresh token.");
            }
        }

        public string GenerateVerificationToken(string email)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(GetJwtSecretKey());

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, email) }),
                    Expires = DateTime.UtcNow.AddHours(24),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating verification token for email {Email}", email);
                throw new Exception("An error occurred while generating the verification token.");
            }
        }

        public async Task SaveRefreshTokenAsync(int userId, string refreshToken, string? ip = null)
        {
            try
            {
                var domainToken = new Domain.Entities.UserToken
                {
                    UserId = userId,
                    Token = refreshToken,
                    CreatedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(7),
                    CreatedByIp = ip
                };

                var dataToken = UserTokenMapper.MapToData(domainToken);
                await _userTokenRepository.CreateAsync(dataToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving refresh token for user {UserId}", userId);
                throw new Exception("An error occurred while saving the refresh token.");
            }
        }

        public async Task<TokenApiResponseDto?> RefreshTokensAsync(string accessToken, string refreshToken)
        {
            try
            {
                var principal = GetPrincipalFromExpiredToken(accessToken);
                var email = principal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(email)) return null;

                var userToken = await _userTokenRepository.GetByTokenAsync(refreshToken);
                if (userToken == null || userToken.User.Email != email || !userToken.IsActive)
                    return null;

                var user = userToken.User;

                var thresholdString = _configuration["TokenSettings:RefreshTokenRenewThresholdHours"];
                if (!double.TryParse(thresholdString, out var thresholdHours))
                    thresholdHours = 1;

                if (userToken.ExpiresAt > DateTime.UtcNow.AddHours(thresholdHours))
                {
                    var newAccessToken = GenerateJwtToken(user.Id, email, user.Role);

                    return new TokenApiResponseDto
                    {
                        AccessToken = newAccessToken,
                        RefreshToken = refreshToken,
                        User = new UserRefreshResponseDto
                        {
                            Id = user.Id,
                            Email = user.Email,
                            Role = user.Role,
                            EmailVerified = user.EmailVerified
                        }
                    };
                }

                var newAccess = GenerateJwtToken(user.Id, email, user.Role);
                var newRefresh = GenerateRefreshToken();

                userToken.Token = newRefresh;
                userToken.CreatedAt = DateTime.UtcNow;
                userToken.ExpiresAt = DateTime.UtcNow.AddDays(7);
                await _userTokenRepository.UpdateAsync(userToken);

                return new TokenApiResponseDto
                {
                    AccessToken = newAccess,
                    RefreshToken = newRefresh,
                    User = new UserRefreshResponseDto
                    {
                        Id = user.Id,
                        Email = user.Email,
                        Role = user.Role,
                        EmailVerified = user.EmailVerified
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error refreshing tokens.");
                throw new Exception("An error occurred while refreshing tokens.");
            }
        }

        public async Task<bool> RevokeRefreshTokenAsync(string accessToken, string? refreshToken)
        {
            try
            {
                var principal = GetPrincipalFromExpiredToken(accessToken);
                var email = principal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                if (string.IsNullOrEmpty(email))
                    return false;

                Data.Entities.UserToken? tokenData;

                if (!string.IsNullOrEmpty(refreshToken))
                {
                    // ищем именно тот refreshToken, который прислал клиент
                    tokenData = await _userTokenRepository.GetByTokenAsync(refreshToken);

                    if (tokenData == null || tokenData.User.Email != email)
                        return false; // защита от подмены чужого токена
                }
                else
                {
                    // ищем последний активный refreshToken по пользователю
                    tokenData = await _userTokenRepository.GetLatestTokenByEmailAsync(email);

                    if (tokenData == null)
                        return false;
                }

                // маппим в Domain
                var token = UserTokenMapper.MapToDomain(tokenData);

                if (!token.IsActive)
                    return false;

                token.RevokedAt = DateTime.UtcNow;

                // обратно в Data и сохраняем
                var updatedData = UserTokenMapper.MapToData(token);
                await _userTokenRepository.UpdateAsync(updatedData);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error revoking refresh token.");
                throw;
            }
        }





        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(GetJwtSecretKey());

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = false
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

                if (validatedToken is not JwtSecurityToken jwtToken ||
                    !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token.");
                }

                return principal;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error validating expired token.");
                throw new Exception("An error occurred while validating the token.");
            }
        }

        public string GetJwtSecretKey()
        {
            try
            {
                return _configuration["Jwt:Key"];
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving JWT secret key.");
                throw new Exception("An error occurred while retrieving the JWT secret key.");
            }
        }

        public async Task<string?> GeneratePasswordResetTokenAsync(string email)
        {
            try
            {
                var user = await _userRepository.GetByEmailAsync(email);
                if (user == null) return null;

                var token = Guid.NewGuid().ToString("N");
                user.PasswordResetToken = token;
                user.PasswordResetExpires = DateTime.UtcNow.AddMinutes(30);

                await _userRepository.UpdateAsync(user);
                return token;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating password reset token for email {Email}", email);
                throw new Exception("An error occurred while generating the password reset token.");
            }
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            try
            {
                var user = await _userRepository.GetByResetTokenAsync(token);
                if (user == null || user.PasswordResetExpires < DateTime.UtcNow)
                    return false;

                user.PasswordHash = HashPassword(newPassword);
                user.PasswordResetToken = null;
                user.PasswordResetExpires = null;

                await _userRepository.UpdateAsync(user);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting password.");
                throw new Exception("An error occurred while resetting the password.");
            }
        }
    }
}
