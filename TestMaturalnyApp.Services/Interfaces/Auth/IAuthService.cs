//using System.Security.Claims;
//using TestMaturalnyApp.Domain.Entities.Enums;
//using TestMaturalnyApp.Domain.Entities.DTOs.Auth;

//namespace TestMaturalnyApp.Services.Interfaces.Auth
//{
//    public interface IAuthService
//    {
//        string HashPassword(string password);
//        bool VerifyPassword(string password, string hashedPassword);

//        string GenerateJwtToken(string email, UserRole role);
//        string GenerateRefreshToken();
//        string GenerateVerificationToken(string email);

//        Task SaveRefreshTokenAsync(int userId, string refreshToken, string? ip = null);
//        TokenApiResponseDto? RefreshTokens(string accessToken, string refreshToken);
//        bool RevokeRefreshToken(string accessToken);

//        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
//        string GetJwtSecretKey();
//    }

//}


using System.Security.Claims;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Entities.DTOs.Auth;

namespace TestMaturalnyApp.Services.Interfaces.Auth
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hashedPassword);

        //string GenerateJwtToken(string email, UserRole role);
        public string GenerateJwtToken(int userId, string email, UserRole role);
        string GenerateRefreshToken();
        string GenerateVerificationToken(string email);
        string GetJwtSecretKey();


        Task SaveRefreshTokenAsync(int userId, string refreshToken, string? ip = null);
        Task<TokenApiResponseDto?> RefreshTokensAsync(string accessToken, string refreshToken);
        Task<bool> RevokeRefreshTokenAsync(string accessToken , string? refreshToken);

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        Task<string?> GeneratePasswordResetTokenAsync(string email);
        Task<bool> ResetPasswordAsync(string token, string newPassword);


    }

}