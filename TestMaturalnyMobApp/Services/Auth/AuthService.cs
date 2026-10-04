// Services/Auth/AuthService.cs
using TestMaturalnyMobApp.Models.DTOs.Auth;

namespace TestMaturalnyMobApp.Services.Auth;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
    Task<RegisterUserDto> RegisterAsync(RegisterUserDto request);
    Task<bool> LogoutAsync(LogoutRequestDto request);
    Task<TokenApiResponseDto> RefreshTokenAsync(TokenApiRequestDto request);
    Task<bool> ForgotPasswordAsync(string email);
    Task<bool> ResetPasswordAsync(string token, string newPassword);
    Task<AuthUserDto> GetCurrentUserAsync();
}

public class AuthService : IAuthService
{
    private readonly AuthApiClient _apiClient;

    public AuthService(AuthApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
    {
        try
        {
            var response = await _apiClient.PostAsync<LoginResponseDto>("auth/login", request);
            return response;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Login error: {ex.Message}");
            throw;
        }
    }

    public async Task<RegisterUserDto> RegisterAsync(RegisterUserDto request)
    {
        try
        {
            var response = await _apiClient.PostAsync<RegisterUserDto>("api/auth/register", request);
            return response;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Register error: {ex.Message}");
            throw;
        }
    }

    public async Task<bool> LogoutAsync(LogoutRequestDto request)
    {
        try
        {
            await _apiClient.PostAsync<object>("api/auth/logout", request);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<TokenApiResponseDto> RefreshTokenAsync(TokenApiRequestDto request)
    {
        try
        {
            var response = await _apiClient.PostAsync<TokenApiResponseDto>("api/auth/refresh", request);
            return response;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Refresh token error: {ex.Message}");
            throw;
        }
    }

    public async Task<bool> ForgotPasswordAsync(string email)
    {
        try
        {
            var request = new ForgotPasswordRequestDto { Email = email };
            var response = await _apiClient.PostAsync<object>("api/auth/forgot-password", request);
            return true;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Forgot password error: {ex.Message}");
            throw;
        }
    }

    public async Task<bool> ResetPasswordAsync(string token, string newPassword)
    {
        try
        {
            var request = new ResetPasswordRequestDto
            {
                Token = token,
                NewPassword = newPassword
            };
            var response = await _apiClient.PostAsync<object>("api/auth/reset-password", request);
            return true;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Reset password error: {ex.Message}");
            throw;
        }
    }

    public async Task<AuthUserDto> GetCurrentUserAsync()
    {
        try
        {
            var response = await _apiClient.GetAsync<AuthUserDto>("api/user/me");
            return response;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Get current user error: {ex.Message}");
            throw;
        }
    }
}
