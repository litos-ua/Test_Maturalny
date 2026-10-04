using Microsoft.Maui.Storage;

namespace TestMaturalnyMobApp.Services.Auth;

public interface ITokenService
{
    Task<string?> GetAccessTokenAsync();
    Task SetAccessTokenAsync(string token);
    Task<string?> GetRefreshTokenAsync();
    Task SetRefreshTokenAsync(string token);
    Task ClearTokensAsync();
    bool HasToken();
    Task<bool> IsTokenValidAsync();
}

public class TokenService : ITokenService
{
    private const string AccessTokenKey = "access_token";
    private const string RefreshTokenKey = "refresh_token";
    private const string TokenExpiryKey = "token_expiry";

    public async Task<string?> GetAccessTokenAsync()
    {
        try
        {
            return await SecureStorage.Default.GetAsync(AccessTokenKey);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Failed to get access token: {ex.Message}");
            return null;
        }
    }

    public async Task SetAccessTokenAsync(string token)
    {
        try
        {
            if (string.IsNullOrEmpty(token))
            {
                SecureStorage.Default.Remove(AccessTokenKey);
                return;
            }
            await SecureStorage.Default.SetAsync(AccessTokenKey, token);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Failed to save access token: {ex.Message}");
        }
    }

    public async Task<string?> GetRefreshTokenAsync()
    {
        try
        {
            return await SecureStorage.Default.GetAsync(RefreshTokenKey);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Failed to get refresh token: {ex.Message}");
            return null;
        }
    }

    public async Task SetRefreshTokenAsync(string token)
    {
        try
        {
            if (string.IsNullOrEmpty(token))
            {
                SecureStorage.Default.Remove(RefreshTokenKey);
                return;
            }
            await SecureStorage.Default.SetAsync(RefreshTokenKey, token);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Failed to save refresh token: {ex.Message}");
        }
    }

    public async Task ClearTokensAsync()
    {
        try
        {
            SecureStorage.Default.Remove(AccessTokenKey);
            SecureStorage.Default.Remove(RefreshTokenKey);
            SecureStorage.Default.Remove(TokenExpiryKey);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Failed to clear tokens: {ex.Message}");
        }
    }

    public bool HasToken()
    {
        try
        {
            var token = SecureStorage.Default.GetAsync(AccessTokenKey).Result;
            return !string.IsNullOrEmpty(token);
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> IsTokenValidAsync()
    {
        try
        {
            var token = await GetAccessTokenAsync();
            if (string.IsNullOrEmpty(token))
                return false;

            // Проверка срока действия токена (если сохранен)
            var expiryStr = await SecureStorage.Default.GetAsync(TokenExpiryKey);
            if (!string.IsNullOrEmpty(expiryStr) && DateTime.TryParse(expiryStr, out var expiry))
            {
                // Если токен истек, но у нас есть refresh-токен, можно попробовать обновить
                if (expiry < DateTime.UtcNow)
                {
                    var refreshToken = await GetRefreshTokenAsync();
                    return !string.IsNullOrEmpty(refreshToken);
                }
            }

            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Сохраняет время истечения токена
    /// </summary>
    public async Task SetTokenExpiryAsync(DateTime expiry)
    {
        try
        {
            await SecureStorage.Default.SetAsync(TokenExpiryKey, expiry.ToString("o"));
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Failed to save token expiry: {ex.Message}");
        }
    }

    /// <summary>
    /// Получает время истечения токена
    /// </summary>
    public async Task<DateTime?> GetTokenExpiryAsync()
    {
        try
        {
            var expiryStr = await SecureStorage.Default.GetAsync(TokenExpiryKey);
            if (!string.IsNullOrEmpty(expiryStr) && DateTime.TryParse(expiryStr, out var expiry))
            {
                return expiry;
            }
            return null;
        }
        catch
        {
            return null;
        }
    }
}

