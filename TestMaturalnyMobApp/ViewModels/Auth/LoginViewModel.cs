// ViewModels/Auth/LoginViewModel.cs
using System.Windows.Input;
using FluentValidation;
using TestMaturalnyMobApp.Helpers.Validators;
using TestMaturalnyMobApp.Models.DTOs.Auth;
using TestMaturalnyMobApp.Services.Auth;

namespace TestMaturalnyMobApp.ViewModels.Auth;

public class LoginViewModel : BaseViewModel
{
    private readonly IAuthService _authService;
    private readonly ITokenService _tokenService;
    private readonly IAuthStateService _authStateService;
    private readonly LoginValidator _validator;

    private string _loginEmail = string.Empty;
    private string _loginPassword = string.Empty;
    private string _errorMessage = string.Empty;
    private bool _isLoading;
    private bool _showPassword;

    public LoginViewModel(
        IAuthService authService,
        ITokenService tokenService,
        IAuthStateService authStateService) : base(authStateService) // ✅ Передаем в Base
    {
        _authService = authService;
        _tokenService = tokenService;
        _authStateService = authStateService;
        _validator = new LoginValidator();

        LoginCommand = new Command(async () => await LoginAsync());
        TogglePasswordVisibilityCommand = new Command(() => ShowPassword = !ShowPassword);
        NavigateToRegisterCommand = new Command(async () => await Shell.Current.GoToAsync("///RegisterPage"));
        NavigateToForgotPasswordCommand = new Command(async () => await Shell.Current.GoToAsync("///ForgotPasswordPage"));
        NavigateToHomeCommand = new Command(async () => await Shell.Current.GoToAsync("///HomePage"));
    }

    public string LoginEmail
    {
        get => _loginEmail;
        set
        {
            if (_loginEmail != value)
            {
                _loginEmail = value;
                OnPropertyChanged();
                ClearError();
            }
        }
    }

    public string LoginPassword
    {
        get => _loginPassword;
        set
        {
            if (_loginPassword != value)
            {
                _loginPassword = value;
                OnPropertyChanged();
                ClearError();
            }
        }
    }

    public string ErrorMessage
    {
        get => _errorMessage;
        set
        {
            if (_errorMessage != value)
            {
                _errorMessage = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(HasError));
            }
        }
    }

    public bool HasError => !string.IsNullOrEmpty(ErrorMessage);

    public bool IsLoading
    {
        get => _isLoading;
        set
        {
            if (_isLoading != value)
            {
                _isLoading = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(IsNotLoading));
            }
        }
    }

    public bool IsNotLoading => !IsLoading;

    public bool ShowPassword
    {
        get => _showPassword;
        set
        {
            if (_showPassword != value)
            {
                _showPassword = value;
                OnPropertyChanged();
            }
        }
    }

    public ICommand LoginCommand { get; }
    public ICommand TogglePasswordVisibilityCommand { get; }
    public ICommand NavigateToRegisterCommand { get; }
    public ICommand NavigateToForgotPasswordCommand { get; }
    public ICommand NavigateToHomeCommand { get; }

    private async Task LoginAsync()
    {
        if (IsLoading) return;

        var request = new LoginRequestDto
        {
            Email = LoginEmail,
            PasswordHash = LoginPassword
        };

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            ErrorMessage = string.Join("\n", validationResult.Errors.Select(e => e.ErrorMessage));
            return;
        }

        IsLoading = true;
        ErrorMessage = string.Empty;

        try
        {
            var response = await _authService.LoginAsync(request);

            if (response?.Token != null)
            {
                await _tokenService.SetAccessTokenAsync(response.Token);
                await _tokenService.SetRefreshTokenAsync(response.RefreshToken);
                await _authStateService.SetUserAsync(response.User, response.Token);

                await Shell.Current.GoToAsync("///HomePage");
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message switch
            {
                var msg when msg.Contains("401") => "Невірний email або пароль",
                var msg when msg.Contains("403") => "Доступ заборонено",
                _ => "Помилка входу. Спробуйте пізніше."
            };
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void ClearError()
    {
        if (!string.IsNullOrEmpty(ErrorMessage))
            ErrorMessage = string.Empty;
    }
}