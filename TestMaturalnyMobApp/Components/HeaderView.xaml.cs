//// Скрывает открывает иконки аутентификации в зависимости от состояния пользователя

//using System.Windows.Input;
//using TestMaturalnyMobApp.Services.Auth;
//using TestMaturalnyMobApp.ViewModels;

//namespace TestMaturalnyMobApp.Components;

//public partial class HeaderView : ContentView
//{
//    private Label _titleLabel;
//    private ImageButton _logoImage;
//    private Button _menuButton;
//    private Button _themeButton;
//    private Button _loginButton;
//    private Button _registerButton;
//    private Button _logoutButton;      // ✅ НОВАЯ КНОПКА
//    private Button _backButton;
//    private HorizontalStackLayout _iconLayout;
//    private HomePageViewModel _viewModel;
//    private readonly IAuthStateService _authStateService;  // ✅ НОВЫЙ СЕРВИС

//    private bool _isAuthenticated;

//    // ✅ Конструктор без параметров (для XAML)
//    public HeaderView() : this(null)
//    {
//    }

//    // ✅ Основной конструктор с DI
//    public HeaderView(IAuthStateService? authStateService)
//    {
//        InitializeComponent();
//        _authStateService = authStateService ?? App.Current?.Handler?.MauiContext?.Services?.GetService<IAuthStateService>();

//        FindControls();
//        SetupSizeChanged();
//        UpdateBackButtonVisibility();

//        if (_authStateService != null)
//        {
//            // ✅ Подписываемся на изменение состояния аутентификации
//            _authStateService.AuthStateChanged += OnAuthStateChanged;

//            // ✅ Инициализация состояния
//            _isAuthenticated = _authStateService.IsAuthenticated;
//            UpdateAuthButtons();
//        }

//        // ✅ BindingContext для команд
//        BindingContext = this;
//    }

//    // ===== СВОЙСТВА =====
//    public bool IsAuthenticated
//    {
//        get => _isAuthenticated;
//        set
//        {
//            if (_isAuthenticated != value)
//            {
//                _isAuthenticated = value;
//                OnPropertyChanged();
//                OnPropertyChanged(nameof(IsNotAuthenticated));
//                UpdateAuthButtons();
//            }
//        }
//    }

//    public bool IsNotAuthenticated => !IsAuthenticated;

//    // ===== КОМАНДЫ =====
//    public ICommand GoHomeCommand => new Command(async () => await Shell.Current.GoToAsync("///HomePage", false));
//    public ICommand GoLoginCommand => new Command(async () => await Shell.Current.GoToAsync("///LoginPage", false));
//    public ICommand GoRegisterCommand => new Command(async () => await Shell.Current.GoToAsync("///RegisterPage", false));
//    public ICommand GoLogoutCommand => new Command(OnLogout);
//    public ICommand ToggleThemeCommand => new Command(OnToggleTheme);
//    public ICommand ToggleMenuCommand => new Command(OnToggleMenu);
//    public ICommand GoBackCommand => new Command(async () => await Shell.Current.GoToAsync("..", false));

//    // ===== ОБРАБОТЧИКИ =====
//    private void OnAuthStateChanged(object sender, AuthStateChangedEventArgs e)
//    {
//        MainThread.BeginInvokeOnMainThread(() =>
//        {
//            IsAuthenticated = e.IsAuthenticated;
//        });
//    }

//    private void UpdateAuthButtons()
//    {
//        if (_loginButton != null)
//            _loginButton.IsVisible = !IsAuthenticated;

//        if (_registerButton != null)
//            _registerButton.IsVisible = !IsAuthenticated;

//        if (_logoutButton != null)
//            _logoutButton.IsVisible = IsAuthenticated;
//    }

//    private async void OnLogout()
//    {
//        var confirm = await Application.Current.MainPage.DisplayAlert(
//            "Вихід",
//            "Ви впевнені, що хочете вийти?",
//            "Так", "Ні");

//        if (confirm)
//        {
//            await _authStateService.ClearUserAsync();
//            await Shell.Current.GoToAsync("///LoginPage");
//        }
//    }

//    private async void OnToggleTheme()
//    {
//        var currentTheme = Application.Current.UserAppTheme;
//        Application.Current.UserAppTheme = currentTheme == AppTheme.Dark ? AppTheme.Light : AppTheme.Dark;
//        UpdateThemeButton();
//    }

//    private void UpdateThemeButton()
//    {
//        if (_themeButton != null)
//        {
//            _themeButton.Text = Application.Current.UserAppTheme == AppTheme.Dark ? "☀️" : "🌙";
//        }
//    }

//    private async void OnToggleMenu()
//    {
//        var menuItems = new List<string>
//        {
//            "🏠 Головна",
//            "📚 Предмети",
//            "📝 Тести",
//            "📖 Правила тестування",
//            "ℹ️ Про платформу",
//            "📞 Контакти"
//        };

//        if (IsAuthenticated)
//        {
//            menuItems.Add("🚪 Вийти");
//        }
//        else
//        {
//            menuItems.Add("🔑 Увійти");
//        }

//        var result = await Application.Current.MainPage.DisplayActionSheet(
//            "📋 Меню",
//            "❌ Закрити",
//            null,
//            menuItems.ToArray());

//        switch (result)
//        {
//            case "🏠 Головна": await Shell.Current.GoToAsync("///HomePage", false); break;
//            case "📚 Предмети": await Shell.Current.GoToAsync("///SubjectsPage", false); break;
//            case "📝 Тести": await Shell.Current.GoToAsync("///TestSelectionPage", false); break;
//            case "📖 Правила тестування": await Shell.Current.GoToAsync("///ExamRulesPage", false); break;
//            case "ℹ️ Про платформу": await Shell.Current.GoToAsync("///AboutPage", false); break;
//            case "📞 Контакти": await Shell.Current.GoToAsync("///ContactsPage", false); break;
//            case "🔑 Увійти": await Shell.Current.GoToAsync("///LoginPage", false); break;
//            case "🚪 Вийти": OnLogout(); break;
//        }
//    }

//    // ===== СУЩЕСТВУЮЩИЕ МЕТОДЫ (с небольшими изменениями) =====
//    private void UpdateBackButtonVisibility()
//    {
//        if (_backButton != null)
//        {
//            var currentPage = Application.Current?.MainPage?.GetType().Name;
//            _backButton.IsVisible = currentPage != "HomePage";
//        }
//    }

//    private async void OnBackClicked(object sender, EventArgs e)
//    {
//        await Shell.Current.GoToAsync("///HomePage", animate: false);
//    }

//    protected override void OnBindingContextChanged()
//    {
//        base.OnBindingContextChanged();

//        if (_viewModel != null)
//        {
//            _viewModel.PropertyChanged -= OnViewModelPropertyChanged;
//        }

//        if (BindingContext is HomePageViewModel viewModel)
//        {
//            _viewModel = viewModel;
//            _viewModel.PropertyChanged += OnViewModelPropertyChanged;
//            UpdateThemeButton();
//        }
//    }

//    private void OnViewModelPropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
//    {
//        if (e.PropertyName == nameof(HomePageViewModel.IsDarkTheme))
//        {
//            UpdateThemeButton();
//        }
//    }

//    private void FindControls()
//    {
//        _titleLabel = this.FindByName<Label>("TitleLabel");
//        _logoImage = this.FindByName<ImageButton>("LogoImage");
//        _menuButton = this.FindByName<Button>("MenuButton");
//        _themeButton = this.FindByName<Button>("ThemeButton");
//        _loginButton = this.FindByName<Button>("LoginButton");
//        _registerButton = this.FindByName<Button>("RegisterButton");
//        _logoutButton = this.FindByName<Button>("LogoutButton");  // ✅ НОВЫЙ
//        _backButton = this.FindByName<Button>("BackButton");
//        _iconLayout = this.FindByName<HorizontalStackLayout>("IconLayout");

//        UpdateThemeButton();
//    }

//    private void SetupSizeChanged()
//    {
//        this.SizeChanged += OnSizeChanged;
//        UpdateSizes();
//    }

//    private void OnSizeChanged(object sender, EventArgs e)
//    {
//        UpdateSizes();
//    }

//    private void UpdateSizes()
//    {
//        var width = this.Width;

//        if (width < 400)
//        {
//            if (_titleLabel != null) _titleLabel.FontSize = 12;
//            if (_logoImage != null) { _logoImage.WidthRequest = 24; _logoImage.HeightRequest = 24; }
//            if (_menuButton != null) { _menuButton.FontSize = 18; _menuButton.WidthRequest = 38; _menuButton.HeightRequest = 38; }
//            if (_themeButton != null) { _themeButton.FontSize = 18; _themeButton.WidthRequest = 38; _themeButton.HeightRequest = 38; }
//            if (_loginButton != null) { _loginButton.FontSize = 16; _loginButton.WidthRequest = 38; _loginButton.HeightRequest = 38; }
//            if (_registerButton != null) { _registerButton.FontSize = 16; _registerButton.WidthRequest = 38; _registerButton.HeightRequest = 38; }
//            if (_logoutButton != null) { _logoutButton.FontSize = 16; _logoutButton.WidthRequest = 38; _logoutButton.HeightRequest = 38; }
//            if (_iconLayout != null) _iconLayout.Spacing = 2;
//        }
//        else if (width < 800)
//        {
//            if (_titleLabel != null) _titleLabel.FontSize = 16;
//            if (_logoImage != null) { _logoImage.WidthRequest = 32; _logoImage.HeightRequest = 32; }
//            if (_menuButton != null) { _menuButton.FontSize = 20; _menuButton.WidthRequest = 42; _menuButton.HeightRequest = 42; }
//            if (_themeButton != null) { _themeButton.FontSize = 20; _themeButton.WidthRequest = 42; _themeButton.HeightRequest = 42; }
//            if (_loginButton != null) { _loginButton.FontSize = 18; _loginButton.WidthRequest = 42; _loginButton.HeightRequest = 42; }
//            if (_registerButton != null) { _registerButton.FontSize = 18; _registerButton.WidthRequest = 42; _registerButton.HeightRequest = 42; }
//            if (_logoutButton != null) { _logoutButton.FontSize = 18; _logoutButton.WidthRequest = 42; _logoutButton.HeightRequest = 42; }
//            if (_iconLayout != null) _iconLayout.Spacing = 4;
//        }
//        else
//        {
//            if (_titleLabel != null) _titleLabel.FontSize = 20;
//            if (_logoImage != null) { _logoImage.WidthRequest = 40; _logoImage.HeightRequest = 40; }
//            if (_menuButton != null) { _menuButton.FontSize = 22; _menuButton.WidthRequest = 46; _menuButton.HeightRequest = 46; }
//            if (_themeButton != null) { _themeButton.FontSize = 22; _themeButton.WidthRequest = 46; _themeButton.HeightRequest = 46; }
//            if (_loginButton != null) { _loginButton.FontSize = 20; _loginButton.WidthRequest = 46; _loginButton.HeightRequest = 46; }
//            if (_registerButton != null) { _registerButton.FontSize = 20; _registerButton.WidthRequest = 46; _registerButton.HeightRequest = 46; }
//            if (_logoutButton != null) { _logoutButton.FontSize = 20; _logoutButton.WidthRequest = 46; _logoutButton.HeightRequest = 46; }
//            if (_iconLayout != null) _iconLayout.Spacing = 6;
//        }
//    }

//    private void OnPropertyChanged(string propertyName)
//    {
//        PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
//    }

//    public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
//}




// Замена эмодзи-кнопок на имеджи.

using System.Windows.Input;
using TestMaturalnyMobApp.Services.Auth;
using TestMaturalnyMobApp.ViewModels;

namespace TestMaturalnyMobApp.Components;

public partial class HeaderView : ContentView
{
    private Label _titleLabel;
    private ImageButton _logoImage;
    private Button _menuButton;
    private Button _themeButton;
    private Button _loginButton;
    private Button _registerButton;
    private Button _logoutButton;
    private Button _backButton;
    private HorizontalStackLayout _iconLayout;
    private HomePageViewModel _viewModel;
    private readonly IAuthStateService _authStateService;

    private bool _isAuthenticated;

    public HeaderView() : this(null)
    {
    }

    public HeaderView(IAuthStateService? authStateService)
    {
        InitializeComponent();
        _authStateService = authStateService ?? App.Current?.Handler?.MauiContext?.Services?.GetService<IAuthStateService>();

        FindControls();
        SetupSizeChanged();
        UpdateBackButtonVisibility();

        if (_authStateService != null)
        {
            _authStateService.AuthStateChanged += OnAuthStateChanged;
            _isAuthenticated = _authStateService.IsAuthenticated;
            UpdateAuthButtons();
        }

        BindingContext = this;
        UpdateAllIcons();
    }

    // ===== СВОЙСТВА =====
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
                UpdateAuthButtons();
            }
        }
    }

    public bool IsNotAuthenticated => !IsAuthenticated;

    // ===== КОМАНДЫ =====
    public ICommand GoHomeCommand => new Command(async () => await Shell.Current.GoToAsync("///HomePage", false));
    public ICommand GoLoginCommand => new Command(async () => await Shell.Current.GoToAsync("///LoginPage", false));
    public ICommand GoRegisterCommand => new Command(async () => await Shell.Current.GoToAsync("///RegisterPage", false));
    public ICommand GoLogoutCommand => new Command(OnLogout);
    public ICommand ToggleThemeCommand => new Command(OnToggleTheme);
    public ICommand ToggleMenuCommand => new Command(OnToggleMenu);
    public ICommand GoBackCommand => new Command(async () => await Shell.Current.GoToAsync("..", false));

    // ===== ОБРАБОТЧИКИ =====
    private void OnAuthStateChanged(object sender, AuthStateChangedEventArgs e)
    {
        MainThread.BeginInvokeOnMainThread(() =>
        {
            IsAuthenticated = e.IsAuthenticated;
        });
    }

    private void UpdateAuthButtons()
    {
        if (_loginButton != null)
            _loginButton.IsVisible = !IsAuthenticated;

        if (_registerButton != null)
            _registerButton.IsVisible = !IsAuthenticated;

        if (_logoutButton != null)
            _logoutButton.IsVisible = IsAuthenticated;
    }

    private async void OnLogout()
    {
        var confirm = await Application.Current.MainPage.DisplayAlert(
            "Вихід",
            "Ви впевнені, що хочете вийти?",
            "Так", "Ні");

        if (confirm)
        {
            await _authStateService.ClearUserAsync();
            await Shell.Current.GoToAsync("///LoginPage");
        }
    }

    private async void OnToggleTheme()
    {
        var currentTheme = Application.Current.UserAppTheme;
        var newTheme = currentTheme == AppTheme.Dark ? AppTheme.Light : AppTheme.Dark;
        Application.Current.UserAppTheme = newTheme;

        UpdateAllIcons();
        System.Diagnostics.Debug.WriteLine($"🎨 Тема переключена на: {(newTheme == AppTheme.Dark ? "Dark" : "Light")}");
    }

    private void UpdateAllIcons()
    {
        var isDark = Application.Current?.UserAppTheme == AppTheme.Dark;

        UpdateButtonIcon(_menuButton, "menu", isDark);
        UpdateButtonIcon(_themeButton, "mode", isDark);
        UpdateButtonIcon(_loginButton, "login", isDark);
        UpdateButtonIcon(_logoutButton, "logout", isDark);
        UpdateButtonIcon(_registerButton, "app_registration", isDark);
    }

    

    private void UpdateButtonIcon(Button? button, string baseName, bool isDark)
    {
        if (button == null) return;

        var suffix = isDark ? "_dark" : "_light";
        button.ImageSource = $"icons/{baseName}{suffix}.png";
        //System.Diagnostics.Debug.WriteLine($"🔄 Установлена иконка: {button.ImageSource}(тема: {(isDark ? "Dark" : "Light")})");

    }

    private async void OnToggleMenu()
    {
        var menuItems = new List<string>
        {
            "🏠 Головна",
            "📚 Предмети",
            "📝 Тести",
            "📖 Правила тестування",
            "ℹ️ Про платформу",
            "📞 Контакти"
        };

        if (IsAuthenticated)
            menuItems.Add("🚪 Вийти");
        else
            menuItems.Add("🔑 Увійти");

        var result = await Application.Current.MainPage.DisplayActionSheet(
            "📋 Меню",
            "❌ Закрити",
            null,
            menuItems.ToArray());

        switch (result)
        {
            case "🏠 Головна": await Shell.Current.GoToAsync("///HomePage", false); break;
            case "📚 Предмети": await Shell.Current.GoToAsync("///SubjectsPage", false); break;
            case "📝 Тести": await Shell.Current.GoToAsync("///TestSelectionPage", false); break;
            case "📖 Правила тестування": await Shell.Current.GoToAsync("///ExamRulesPage", false); break;
            case "ℹ️ Про платформу": await Shell.Current.GoToAsync("///AboutPage", false); break;
            case "📞 Контакти": await Shell.Current.GoToAsync("///ContactsPage", false); break;
            case "🔑 Увійти": await Shell.Current.GoToAsync("///LoginPage", false); break;
            case "🚪 Вийти": OnLogout(); break;
        }
    }

    // ===== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ =====
    private void UpdateBackButtonVisibility()
    {
        if (_backButton != null)
        {
            var currentPage = Application.Current?.MainPage?.GetType().Name;
            _backButton.IsVisible = currentPage != "HomePage";
        }
    }

    private async void OnBackClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("///HomePage", animate: false);
    }

    private void FindControls()
    {
        _titleLabel = this.FindByName<Label>("TitleLabel");
        _logoImage = this.FindByName<ImageButton>("LogoImage");
        _menuButton = this.FindByName<Button>("MenuButton");
        _themeButton = this.FindByName<Button>("ThemeButton");
        _loginButton = this.FindByName<Button>("LoginButton");
        _registerButton = this.FindByName<Button>("RegisterButton");
        _logoutButton = this.FindByName<Button>("LogoutButton");
        _backButton = this.FindByName<Button>("BackButton");
        _iconLayout = this.FindByName<HorizontalStackLayout>("IconLayout");
    }

    private void SetupSizeChanged()
    {
        this.SizeChanged += OnSizeChanged;
        UpdateSizes();
    }

    private void OnSizeChanged(object sender, EventArgs e)
    {
        UpdateSizes();
    }

    private void UpdateSizes()
    {
        var width = this.Width;

        if (width < 400)
        {
            if (_titleLabel != null) _titleLabel.FontSize = 12;
            if (_logoImage != null) { _logoImage.WidthRequest = 24; _logoImage.HeightRequest = 24; }
            if (_menuButton != null) { _menuButton.FontSize = 18; _menuButton.WidthRequest = 38; _menuButton.HeightRequest = 38; }
            if (_themeButton != null) { _themeButton.FontSize = 18; _themeButton.WidthRequest = 38; _themeButton.HeightRequest = 38; }
            if (_loginButton != null) { _loginButton.FontSize = 16; _loginButton.WidthRequest = 38; _loginButton.HeightRequest = 38; }
            if (_registerButton != null) { _registerButton.FontSize = 16; _registerButton.WidthRequest = 38; _registerButton.HeightRequest = 38; }
            if (_logoutButton != null) { _logoutButton.FontSize = 16; _logoutButton.WidthRequest = 38; _logoutButton.HeightRequest = 38; }
            if (_iconLayout != null) _iconLayout.Spacing = 2;
        }
        else if (width < 800)
        {
            if (_titleLabel != null) _titleLabel.FontSize = 16;
            if (_logoImage != null) { _logoImage.WidthRequest = 32; _logoImage.HeightRequest = 32; }
            if (_menuButton != null) { _menuButton.FontSize = 20; _menuButton.WidthRequest = 42; _menuButton.HeightRequest = 42; }
            if (_themeButton != null) { _themeButton.FontSize = 20; _themeButton.WidthRequest = 42; _themeButton.HeightRequest = 42; }
            if (_loginButton != null) { _loginButton.FontSize = 18; _loginButton.WidthRequest = 42; _loginButton.HeightRequest = 42; }
            if (_registerButton != null) { _registerButton.FontSize = 18; _registerButton.WidthRequest = 42; _registerButton.HeightRequest = 42; }
            if (_logoutButton != null) { _logoutButton.FontSize = 18; _logoutButton.WidthRequest = 42; _logoutButton.HeightRequest = 42; }
            if (_iconLayout != null) _iconLayout.Spacing = 4;
        }
        else
        {
            if (_titleLabel != null) _titleLabel.FontSize = 20;
            if (_logoImage != null) { _logoImage.WidthRequest = 40; _logoImage.HeightRequest = 40; }
            if (_menuButton != null) { _menuButton.FontSize = 22; _menuButton.WidthRequest = 46; _menuButton.HeightRequest = 46; }
            if (_themeButton != null) { _themeButton.FontSize = 22; _themeButton.WidthRequest = 46; _themeButton.HeightRequest = 46; }
            if (_loginButton != null) { _loginButton.FontSize = 20; _loginButton.WidthRequest = 46; _loginButton.HeightRequest = 46; }
            if (_registerButton != null) { _registerButton.FontSize = 20; _registerButton.WidthRequest = 46; _registerButton.HeightRequest = 46; }
            if (_logoutButton != null) { _logoutButton.FontSize = 20; _logoutButton.WidthRequest = 46; _logoutButton.HeightRequest = 46; }
            if (_iconLayout != null) _iconLayout.Spacing = 6;
        }
    }

    private void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
    }

    public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
}