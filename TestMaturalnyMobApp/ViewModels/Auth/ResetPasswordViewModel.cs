using System.Windows.Input;
using TestMaturalnyMobApp.Helpers.Validators;
using TestMaturalnyMobApp.Services.Auth;

namespace TestMaturalnyMobApp.ViewModels.Auth;

public class ResetPasswordViewModel : BaseViewModel
{
    private readonly IAuthService _authService;
    private readonly ResetPasswordValidator _validator;

    private string _token = string.Empty;
    private string _newPassword = string.Empty;
    private string _confirmPassword = string.Empty;
    private string _errorMessage = string.Empty;
    private string _successMessage = string.Empty;
    private bool _isLoading;
    private bool _showNewPassword;
    private bool _showConfirmPassword;

    public ResetPasswordViewModel(
        IAuthService authService,
        IAuthStateService authStateService) : base(authStateService)
    {
        _authService = authService;
        _validator = new ResetPasswordValidator();

        ResetPasswordCommand = new Command(async () => await ResetPasswordAsync());
        ToggleNewPasswordVisibilityCommand = new Command(() => ShowNewPassword = !ShowNewPassword);
        ToggleConfirmPasswordVisibilityCommand = new Command(() => ShowConfirmPassword = !ShowConfirmPassword);
        NavigateToLoginCommand = new Command(async () => await Shell.Current.GoToAsync("///LoginPage"));
    }

    public string Token
    {
        get => _token;
        set
        {
            if (_token != value)
            {
                _token = value;
                OnPropertyChanged();
            }
        }
    }

    public string NewPassword
    {
        get => _newPassword;
        set
        {
            if (_newPassword != value)
            {
                _newPassword = value;
                OnPropertyChanged();
                ClearMessages();
            }
        }
    }

    public string ConfirmPassword
    {
        get => _confirmPassword;
        set
        {
            if (_confirmPassword != value)
            {
                _confirmPassword = value;
                OnPropertyChanged();
                ClearMessages();
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

    public string SuccessMessage
    {
        get => _successMessage;
        set
        {
            if (_successMessage != value)
            {
                _successMessage = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(HasSuccess));
            }
        }
    }

    public bool HasSuccess => !string.IsNullOrEmpty(SuccessMessage);

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

    public bool ShowNewPassword
    {
        get => _showNewPassword;
        set
        {
            if (_showNewPassword != value)
            {
                _showNewPassword = value;
                OnPropertyChanged();
            }
        }
    }

    public bool ShowConfirmPassword
    {
        get => _showConfirmPassword;
        set
        {
            if (_showConfirmPassword != value)
            {
                _showConfirmPassword = value;
                OnPropertyChanged();
            }
        }
    }

    public ICommand ResetPasswordCommand { get; }
    public ICommand ToggleNewPasswordVisibilityCommand { get; }
    public ICommand ToggleConfirmPasswordVisibilityCommand { get; }
    public ICommand NavigateToLoginCommand { get; }

    public void SetToken(string token)
    {
        Token = token;
    }

    private async Task ResetPasswordAsync()
    {
        if (IsLoading) return;

        var request = new ResetPasswordRequest
        {
            Token = Token,
            NewPassword = NewPassword,
            ConfirmPassword = ConfirmPassword
        };

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            ErrorMessage = string.Join("\n", validationResult.Errors.Select(e => e.ErrorMessage));
            return;
        }

        IsLoading = true;
        ErrorMessage = string.Empty;
        SuccessMessage = string.Empty;

        try
        {
            await _authService.ResetPasswordAsync(Token, NewPassword);

            SuccessMessage = "Пароль успішно змінено!";

            NewPassword = string.Empty;
            ConfirmPassword = string.Empty;
            Token = string.Empty;

            await Task.Delay(2000);
            await Shell.Current.GoToAsync("///LoginPage");
        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message switch
            {
                var msg when msg.Contains("401") || msg.Contains("Invalid") => "Невірний або прострочений токен",
                _ => "Помилка скидання пароля. Спробуйте пізніше."
            };
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void ClearMessages()
    {
        if (!string.IsNullOrEmpty(ErrorMessage))
            ErrorMessage = string.Empty;
        if (!string.IsNullOrEmpty(SuccessMessage))
            SuccessMessage = string.Empty;
    }
}
