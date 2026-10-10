
// Поддержка аутентификации в BaseViewModel, чтобы все ViewModel могли использовать общее состояние.

using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using TestMaturalnyMobApp.Services.Auth;

public abstract class BaseViewModel : INotifyPropertyChanged
{
    private bool _isDarkTheme;
    private bool _isAuthenticated;
    private string _userEmail = string.Empty;
    private string _userName = string.Empty;
    protected readonly IAuthStateService? _authStateService;
    public string AppVersion => $"Версія: {AppInfo.Current.VersionString}";

    // ===== СВОЙСТВА =====
    public bool IsDarkTheme
    {
        get => _isDarkTheme;
        set
        {
            if (_isDarkTheme != value)
            {
                _isDarkTheme = value;
                OnPropertyChanged();
                Application.Current.UserAppTheme = value ? AppTheme.Dark : AppTheme.Light;
            }
        }
    }

    public bool IsAuthenticated
    {
        get => _isAuthenticated;
        set
        {
            if (_isAuthenticated != value)
            {
                _isAuthenticated = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(IsNotAuthenticated));
            }
        }
    }

    public bool IsNotAuthenticated => !IsAuthenticated;

    public string UserEmail
    {
        get => _userEmail;
        set
        {
            if (_userEmail != value)
            {
                _userEmail = value;
                OnPropertyChanged();
            }
        }
    }

    public string UserName
    {
        get => _userName;
        set
        {
            if (_userName != value)
            {
                _userName = value;
                OnPropertyChanged();
            }
        }
    }

    // ===== КОМАНДЫ =====
    public ICommand ToggleThemeCommand { get; }
    public ICommand GoHomeCommand { get; }

    // ✅ Конструктор без параметров (для HomePage и др.)
    protected BaseViewModel()
    {
        _authStateService = null;
        IsDarkTheme = Application.Current?.UserAppTheme == AppTheme.Dark;

        ToggleThemeCommand = new Command(OnToggleTheme);
        GoHomeCommand = new Command(OnGoHome);
    }

    // ✅ Конструктор с AuthStateService (для страниц аутентификации)
    protected BaseViewModel(IAuthStateService authStateService) : this()
    {
        _authStateService = authStateService;
        if (_authStateService != null)
        {
            _authStateService.AuthStateChanged += OnAuthStateChanged;
            IsAuthenticated = _authStateService.IsAuthenticated;
            UserEmail = _authStateService.CurrentUser?.Email ?? string.Empty;
            UserName = _authStateService.CurrentUser?.Username ?? string.Empty;
        }
    }

    // ===== МЕТОДЫ КОМАНД =====
    private void OnToggleTheme()
    {
        IsDarkTheme = !IsDarkTheme;
    }

    private async void OnGoHome()
    {
        await Shell.Current.GoToAsync("///HomePage");
    }

    // ===== ОБРАБОТЧИК ИЗМЕНЕНИЯ СОСТОЯНИЯ =====
    private void OnAuthStateChanged(object? sender, AuthStateChangedEventArgs e)
    {
        MainThread.BeginInvokeOnMainThread(() =>
        {
            IsAuthenticated = e.IsAuthenticated;
            if (e.IsAuthenticated && e.User != null)
            {
                UserEmail = e.User.Email ?? string.Empty;
                UserName = e.User.Username ?? string.Empty;
            }
            else
            {
                UserEmail = string.Empty;
                UserName = string.Empty;
            }
        });
    }

    // ===== INotifyPropertyChanged =====
    public event PropertyChangedEventHandler? PropertyChanged;
    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    // ===== ОЧИСТКА РЕСУРСОВ =====
    public virtual void Dispose()
    {
        if (_authStateService != null)
        {
            _authStateService.AuthStateChanged -= OnAuthStateChanged;
        }
    }
}