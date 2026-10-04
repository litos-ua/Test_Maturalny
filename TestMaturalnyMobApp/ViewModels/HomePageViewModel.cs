//using System.Collections.ObjectModel;
//using System.Windows.Input;

//namespace TestMaturalnyMobApp.ViewModels;

//public class HomePageViewModel
//{
//    private bool _isDarkTheme;
//    private bool _isBackVisible;
//    public bool IsDarkTheme
//    {
//        get => _isDarkTheme;
//        set
//        {
//            if (_isDarkTheme != value)
//            {
//                _isDarkTheme = value;
//                OnPropertyChanged(nameof(IsDarkTheme));
//                Application.Current.UserAppTheme = value ? AppTheme.Dark : AppTheme.Light;
//            }
//        }
//    }

//    // ✅ СВОЙСТВО ДЛЯ ВИДИМОСТИ КНОПКИ "НАЗАД"
//    public bool IsBackVisible
//    {
//        get => _isBackVisible;
//        set
//        {
//            if (_isBackVisible != value)
//            {
//                _isBackVisible = value;
//                OnPropertyChanged(nameof(IsBackVisible));
//            }
//        }
//    }

//    // ===== ДАННЫЕ ДЛЯ ANIMATED TEXT BLOCK =====
//    public string[][] AnimatedTexts { get; } = new[]
//    {
//        new[] { "Все, що необхідно знати", "про випускні тести" },
//        new[] { "Підготуйся до НМТ зараз", "з нашою платформою" }
//    };

//    public string[][] AnimatedColorPairs { get; } = new[]
//    {
//        new[] { "#FFA07A", "#ADD8E6" },
//        new[] { "#9c27b0", "#F4A460" },
//        new[] { "#808000", "#FFD700" }
//    };

//    // ===== КОМАНДЫ =====
//    public ICommand GoHomeCommand { get; }
//    public ICommand GoTestCommand { get; }
//    public ICommand GoAboutCommand { get; }
//    public ICommand GoContactsCommand { get; }
//    public ICommand GoLoginCommand { get; }
//    public ICommand GoRegisterCommand { get; }
//    public ICommand ToggleThemeCommand { get; }
//    public ICommand ToggleMenuCommand { get; }

//    public ObservableCollection<string> MenuItems { get; } = new()
//    {
//        "Предмети",
//        "Правила тестування",
//        "Тести",
//        "Про платформу"
//    };

//    public HomePageViewModel()
//    {
//        IsDarkTheme = Application.Current?.UserAppTheme == AppTheme.Dark;

//        GoHomeCommand = new Command(OnGoHome);
//        GoTestCommand = new Command(OnGoTest);
//        GoAboutCommand = new Command(OnGoAbout);
//        GoContactsCommand = new Command(OnGoContacts);
//        GoLoginCommand = new Command(OnGoLogin);
//        GoRegisterCommand = new Command(OnGoRegister);
//        ToggleThemeCommand = new Command(OnToggleTheme);
//        ToggleMenuCommand = new Command(OnToggleMenu);
//    }

//    private async void OnGoHome() => await Shell.Current.GoToAsync("///HomePage", animate: false);
//    private async void OnGoTest() => await Shell.Current.GoToAsync("///TestSelectionPage", animate: false);
//    private async void OnGoAbout() => await Application.Current.MainPage.DisplayAlert("Инфо", "Про платформу", "OK");
//    private async void OnGoContacts() => await Application.Current.MainPage.DisplayAlert("Инфо", "Контакты", "OK");
//    private async void OnGoLogin() => await Application.Current.MainPage.DisplayAlert("Инфо", "Вход", "OK");
//    private async void OnGoRegister() => await Application.Current.MainPage.DisplayAlert("Инфо", "Регистрация", "OK");

//    private void OnToggleTheme()
//    {
//        IsDarkTheme = !IsDarkTheme;
//        System.Diagnostics.Debug.WriteLine($"Theme toggled to: {(IsDarkTheme ? "Dark" : "Light")}");
//    }

//    private async void OnToggleMenu()
//    {
//        var result = await Application.Current.MainPage.DisplayActionSheet(
//            "Меню",
//            "Отмена",
//            null,
//            MenuItems.ToArray());

//        if (result == "Тести")
//            await Shell.Current.GoToAsync("///TestSelectionPage", animate: false);
//        else if (result == "Про платформу")
//            await Shell.Current.GoToAsync("///AboutPage", animate: false);
//        else if (result == "Предмети")
//            await Application.Current.MainPage.DisplayAlert("Инфо", "Предмети", "OK");
//        else if (result == "Правила тестування")
//            //await Application.Current.MainPage.DisplayAlert("Инфо", "Правила тестування", "OK");
//            await Shell.Current.GoToAsync("///ExamRulesPage", animate: false);
//    }

//    public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
//    protected virtual void OnPropertyChanged(string propertyName)
//    {
//        PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
//    }
//}

// Модернизируем выпадающее меню.
using System.Collections.ObjectModel;
using System.Windows.Input;

namespace TestMaturalnyMobApp.ViewModels;

public class HomePageViewModel : BaseViewModel // наследуемся от BaseViewModel, чтобы получать состояние Auth
{
    private bool _isDarkTheme;
    private bool _isBackVisible;
    public bool IsDarkTheme
    {
        get => _isDarkTheme;
        set
        {
            if (_isDarkTheme != value)
            {
                _isDarkTheme = value;
                OnPropertyChanged(nameof(IsDarkTheme));
                Application.Current.UserAppTheme = value ? AppTheme.Dark : AppTheme.Light;
            }
        }
    }

    // ✅ СВОЙСТВО ДЛЯ ВИДИМОСТИ КНОПКИ "НАЗАД"
    public bool IsBackVisible
    {
        get => _isBackVisible;
        set
        {
            if (_isBackVisible != value)
            {
                _isBackVisible = value;
                OnPropertyChanged(nameof(IsBackVisible));
            }
        }
    }

    // ===== ДАННЫЕ ДЛЯ ANIMATED TEXT BLOCK =====
    public string[][] AnimatedTexts { get; } = new[]
    {
        new[] { "Все, що необхідно знати", "про випускні тести" },
        new[] { "Підготуйся до НМТ зараз", "з нашою платформою" }
    };

    public string[][] AnimatedColorPairs { get; } = new[]
    {
        new[] { "#FFA07A", "#ADD8E6" },
        new[] { "#9c27b0", "#F4A460" },
        new[] { "#808000", "#FFD700" }
    };

    // ===== КОМАНДЫ =====
    public ICommand GoHomeCommand { get; }
    public ICommand GoTestCommand { get; }
    public ICommand GoAboutCommand { get; }
    public ICommand GoContactsCommand { get; }
    public ICommand GoLoginCommand { get; }
    public ICommand GoRegisterCommand { get; }
    public ICommand ToggleThemeCommand { get; }
    //public ICommand ToggleMenuCommand { get; }

    public ObservableCollection<string> MenuItems { get; } = new()
    {
        "Предмети",
        "Правила тестування",
        "Тести",
        "Про платформу"
    };

    public HomePageViewModel()
    {
        IsDarkTheme = Application.Current?.UserAppTheme == AppTheme.Dark;

        GoHomeCommand = new Command(OnGoHome);
        GoTestCommand = new Command(OnGoTest);
        GoAboutCommand = new Command(OnGoAbout);
        GoContactsCommand = new Command(OnGoContacts);
        GoLoginCommand = new Command(OnGoLogin);
        GoRegisterCommand = new Command(OnGoRegister);
        ToggleThemeCommand = new Command(OnToggleTheme);
        //ToggleMenuCommand = new Command(OnToggleMenu);
    }

    private async void OnGoHome() => await Shell.Current.GoToAsync("///HomePage", animate: false);
    private async void OnGoTest() => await Shell.Current.GoToAsync("///TestSelectionPage", animate: false);
    private async void OnGoAbout() => await Application.Current.MainPage.DisplayAlert("Инфо", "Про платформу", "OK");
    private async void OnGoContacts() => await Application.Current.MainPage.DisplayAlert("Инфо", "Контакты", "OK");
    private async void OnGoLogin() => await Shell.Current.GoToAsync("///LoginPage", animate: false);
    private async void OnGoRegister() => await Shell.Current.GoToAsync("///RegisterPage", animate: false);

    private void OnToggleTheme()
    {
        IsDarkTheme = !IsDarkTheme;
        System.Diagnostics.Debug.WriteLine($"Theme toggled to: {(IsDarkTheme ? "Dark" : "Light")}");
    }

    //private async void OnToggleMenu()
    //{
    //    var result = await Application.Current.MainPage.DisplayActionSheet(
    //        "📋 Меню",
    //        "❌ Закрити",
    //        null,
    //        new[]
    //        {
    //        "🏠 Головна",
    //        "📚 Предмети",
    //        "📝 Тести",
    //        "📖 Правила тестування",
    //        "ℹ️ Про платформу",
    //        "📞 Контакти",
    //        "🔑 Увійти",
    //        "🚪 Вийти"
    //        });

    //    switch (result)
    //    {
    //        case "🏠 Головна":
    //            await Shell.Current.GoToAsync("///HomePage", false);
    //            break;
    //        case "📚 Предмети":
    //            await Shell.Current.GoToAsync("///SubjectsPage", false);
    //            break;
    //        case "📝 Тести":
    //            await Shell.Current.GoToAsync("///TestSelectionPage", false);
    //            break;
    //        case "📖 Правила тестування":
    //            await Shell.Current.GoToAsync("///ExamRulesPage", false);
    //            break;
    //        case "ℹ️ Про платформу":
    //            await Shell.Current.GoToAsync("///AboutPage", false);
    //            break;
    //        case "📞 Контакти":
    //            await Shell.Current.GoToAsync("///ContactsPage", false);
    //            break;
    //        case "🔑 Увійти":
    //            await Shell.Current.GoToAsync("///LoginPage", false);
    //            break;
    //        case "🚪 Вийти":
    //            OnLogout();
    //            break;
    //    }
    //}

    private async void OnLogout()
    {
        if (_authStateService != null)
        {
            await _authStateService.ClearUserAsync();
        }
        await Shell.Current.GoToAsync("///LoginPage");
    }

    public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
    }
}