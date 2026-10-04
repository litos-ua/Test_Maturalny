using System.Windows.Input;
using TestMaturalnyMobApp.Services.Auth;

namespace TestMaturalnyMobApp.ViewModels.Auth;

public class ForgotPasswordViewModel : BaseViewModel
{
    private readonly IAuthService _authService;

    private string _email = string.Empty;
    private string _errorMessage = string.Empty;
    private string _successMessage = string.Empty;
    private bool _isLoading;

    public ForgotPasswordViewModel(
        IAuthService authService,
        IAuthStateService authStateService) : base(authStateService)
    {
        _authService = authService;

        ForgotPasswordCommand = new Command(async () => await ForgotPasswordAsync());
        NavigateToLoginCommand = new Command(async () => await Shell.Current.GoToAsync("///LoginPage"));
        NavigateToHomeCommand = new Command(async () => await Shell.Current.GoToAsync("///HomePage"));
    }

    public string Email
    {
        get => _email;
        set
        {
            if (_email != value)
            {
                _email = value;
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

    public ICommand ForgotPasswordCommand { get; }
    public ICommand NavigateToLoginCommand { get; }
    public ICommand NavigateToHomeCommand { get; }

    private async Task ForgotPasswordAsync()
    {
        if (IsLoading) return;

        if (string.IsNullOrWhiteSpace(Email))
        {
            ErrorMessage = "Введіть email";
            return;
        }

        if (!IsValidEmail(Email))
        {
            ErrorMessage = "Невірний формат email";
            return;
        }

        IsLoading = true;
        ErrorMessage = string.Empty;
        SuccessMessage = string.Empty;

        try
        {
            await _authService.ForgotPasswordAsync(Email);

            SuccessMessage = "Інструкції для відновлення пароля надіслано на вашу пошту";
            Email = string.Empty;
        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message switch
            {
                var msg when msg.Contains("404") => "Користувача з таким email не знайдено",
                _ => "Помилка відновлення пароля. Спробуйте пізніше."
            };
        }
        finally
        {
            IsLoading = false;
        }
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
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
