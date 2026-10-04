// Services/Auth/AuthStateService.cs
using TestMaturalnyMobApp.Models.DTOs.Auth;

namespace TestMaturalnyMobApp.Services.Auth;

public interface IAuthStateService
{
    bool IsAuthenticated { get; }
    AuthUserDto? CurrentUser { get; }
    string? AccessToken { get; }
    event EventHandler<AuthStateChangedEventArgs>? AuthStateChanged;
    Task SetUserAsync(AuthUserDto? user, string? accessToken = null);
    Task ClearUserAsync();
    Task<bool> CheckAuthenticationAsync();
}

public class AuthStateChangedEventArgs : EventArgs
{
    public bool IsAuthenticated { get; }
    public AuthUserDto? User { get; }

    public AuthStateChangedEventArgs(bool isAuthenticated, AuthUserDto? user = null)
    {
        IsAuthenticated = isAuthenticated;
        User = user;
    }
}

public class AuthStateService : IAuthStateService
{
    private AuthUserDto? _currentUser;
    private bool _isAuthenticated;
    private string? _accessToken;
    private readonly ITokenService _tokenService;

    public event EventHandler<AuthStateChangedEventArgs>? AuthStateChanged;

    public bool IsAuthenticated => _isAuthenticated;
    public AuthUserDto? CurrentUser => _currentUser;
    public string? AccessToken => _accessToken;

    public AuthStateService(ITokenService tokenService)
    {
        _tokenService = tokenService;
        _ = InitializeAsync();
    }

    private async Task InitializeAsync()
    {
        var token = await _tokenService.GetAccessTokenAsync();
        _accessToken = token;
        _isAuthenticated = !string.IsNullOrEmpty(token);

        if (_isAuthenticated)
        {
            // Можно загрузить данные пользователя, если нужно
            // _currentUser = await _userService.GetCurrentUserAsync();
        }

        OnAuthStateChanged();
    }

    public async Task SetUserAsync(AuthUserDto? user, string? accessToken = null)
    {
        _currentUser = user;
        _isAuthenticated = user != null;

        if (!string.IsNullOrEmpty(accessToken))
        {
            _accessToken = accessToken;
            await _tokenService.SetAccessTokenAsync(accessToken);
        }

        OnAuthStateChanged();
    }

    public async Task ClearUserAsync()
    {
        _currentUser = null;
        _isAuthenticated = false;
        _accessToken = null;
        await _tokenService.ClearTokensAsync();
        OnAuthStateChanged();
    }

    public async Task<bool> CheckAuthenticationAsync()
    {
        var token = await _tokenService.GetAccessTokenAsync();
        _accessToken = token;
        _isAuthenticated = !string.IsNullOrEmpty(token);

        if (!_isAuthenticated)
        {
            _currentUser = null;
        }

        return _isAuthenticated;
    }

    private void OnAuthStateChanged()
    {
        AuthStateChanged?.Invoke(this, new AuthStateChangedEventArgs(_isAuthenticated, _currentUser));
    }
}
