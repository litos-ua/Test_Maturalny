using System.Windows.Input;
using FluentValidation;
using TestMaturalnyMobApp.Helpers.Validators;
using TestMaturalnyMobApp.Models.DTOs.Auth;
using TestMaturalnyMobApp.Services.Auth;

namespace TestMaturalnyMobApp.ViewModels.Auth;

public class RegisterViewModel : BaseViewModel
{
    private readonly IAuthService _authService;
    private readonly RegisterValidator _validator;

    private string _username = string.Empty;
    private string _email = string.Empty;
    private string _password = string.Empty;
    private string _confirmPassword = string.Empty;
    private string _fullname = string.Empty;
    private string _address = string.Empty;
    private string _phoneNumber = string.Empty;
    private string _errorMessage = string.Empty;
    private string _successMessage = string.Empty;
    private bool _isLoading;
    private bool _agreeToTerms;
    private bool _showPassword;
    private bool _showConfirmPassword;

    public RegisterViewModel(
        IAuthService authService,
        IAuthStateService authStateService) : base(authStateService)
    {
        _authService = authService;
        _validator = new RegisterValidator();

        RegisterCommand = new Command(async () => await RegisterAsync());
        TogglePasswordVisibilityCommand = new Command(() => ShowPassword = !ShowPassword);
        ToggleConfirmPasswordVisibilityCommand = new Command(() => ShowConfirmPassword = !ShowConfirmPassword);
        NavigateToLoginCommand = new Command(async () => await Shell.Current.GoToAsync("///LoginPage"));
        NavigateToHomeCommand = new Command(async () => await Shell.Current.GoToAsync("///HomePage"));
    }

    public string Username
    {
        get => _username;
        set
        {
            if (_username != value)
            {
                _username = value;
                OnPropertyChanged();
                ClearError();
            }
        }
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
                ClearError();
            }
        }
    }

    public string Password
    {
        get => _password;
        set
        {
            if (_password != value)
            {
                _password = value;
                OnPropertyChanged();
                ClearError();
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
                ClearError();
            }
        }
    }

    public string Fullname
    {
        get => _fullname;
        set
        {
            if (_fullname != value)
            {
                _fullname = value;
                OnPropertyChanged();
            }
        }
    }

    public string Address
    {
        get => _address;
        set
        {
            if (_address != value)
            {
                _address = value;
                OnPropertyChanged();
            }
        }
    }

    public string PhoneNumber
    {
        get => _phoneNumber;
        set
        {
            if (_phoneNumber != value)
            {
                _phoneNumber = value;
                OnPropertyChanged();
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

    public bool AgreeToTerms
    {
        get => _agreeToTerms;
        set
        {
            if (_agreeToTerms != value)
            {
                _agreeToTerms = value;
                OnPropertyChanged();
                ClearError();
            }
        }
    }

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

    public ICommand RegisterCommand { get; }
    public ICommand TogglePasswordVisibilityCommand { get; }
    public ICommand ToggleConfirmPasswordVisibilityCommand { get; }
    public ICommand NavigateToLoginCommand { get; }
    public ICommand NavigateToHomeCommand { get; }

    private async Task RegisterAsync()
    {
        if (IsLoading) return;

        var request = new RegisterUserDto
        {
            Username = Username,
            Email = Email,
            PasswordHash = Password,
            Fullname = Fullname,
            Address = Address,
            PhoneNumber = PhoneNumber
        };

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            ErrorMessage = string.Join("\n", validationResult.Errors.Select(e => e.ErrorMessage));
            return;
        }

        if (!AgreeToTerms)
        {
            ErrorMessage = "Необхідно погодитися з умовами використання";
            return;
        }

        IsLoading = true;
        ErrorMessage = string.Empty;
        SuccessMessage = string.Empty;

        try
        {
            await _authService.RegisterAsync(request);

            SuccessMessage = "Реєстрація успішна! Тепер ви можете увійти.";

            // Очищаем форму
            Username = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;
            Fullname = string.Empty;
            Address = string.Empty;
            PhoneNumber = string.Empty;
            AgreeToTerms = false;

            // Переход на страницу входа через 2 секунды
            await Task.Delay(2000);
            await Shell.Current.GoToAsync("///LoginPage");
        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message switch
            {
                var msg when msg.Contains("Conflict") => "Користувач з таким email вже існує",
                var msg when msg.Contains("400") => "Невірні дані реєстрації",
                _ => "Помилка реєстрації. Спробуйте пізніше."
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
        if (!string.IsNullOrEmpty(SuccessMessage))
            SuccessMessage = string.Empty;
    }
}
