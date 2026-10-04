//namespace TestMaturalnyMobApp;

//public partial class AppShell : Shell
//{
//    public AppShell()
//    {
//        InitializeComponent();

//        // Регистрируем маршруты
//        Routing.RegisterRoute("HomePage", typeof(Views.HomePage));
//        Routing.RegisterRoute("TestSelectionPage", typeof(Views.TestSelectionPage));
//        Routing.RegisterRoute("AboutPage", typeof(Views.AboutPage));
//        Routing.RegisterRoute("TestSessionPage", typeof(Views.TestSessionPage));
//        Routing.RegisterRoute("ExamRulesPage", typeof(Views.ExamRulesPage));
//        Routing.RegisterRoute("SubjectsPage", typeof(Views.SubjectsPage));
//        Routing.RegisterRoute("LoginPage", typeof(Views.Auth.LoginPage));
//        Routing.RegisterRoute("RegisterPage", typeof(Views.Auth.RegisterPage));
//        Routing.RegisterRoute("ForgotPasswordPage", typeof(Views.Auth.ForgotPasswordPage));
//        Routing.RegisterRoute("ResetPasswordPage", typeof(Views.Auth.ResetPasswordPage));
//    }
//}

using TestMaturalnyMobApp.Services.Auth;

namespace TestMaturalnyMobApp;

public partial class AppShell : Shell
{
    private readonly IAuthStateService? _authStateService;

    public AppShell()
    {
        InitializeComponent();

        // Регистрируем маршруты
        Routing.RegisterRoute("HomePage", typeof(Views.HomePage));
        Routing.RegisterRoute("TestSelectionPage", typeof(Views.TestSelectionPage));
        Routing.RegisterRoute("AboutPage", typeof(Views.AboutPage));
        Routing.RegisterRoute("TestSessionPage", typeof(Views.TestSessionPage));
        Routing.RegisterRoute("ExamRulesPage", typeof(Views.ExamRulesPage));
        Routing.RegisterRoute("SubjectsPage", typeof(Views.SubjectsPage));
        Routing.RegisterRoute("LoginPage", typeof(Views.Auth.LoginPage));
        Routing.RegisterRoute("RegisterPage", typeof(Views.Auth.RegisterPage));
        Routing.RegisterRoute("ForgotPasswordPage", typeof(Views.Auth.ForgotPasswordPage));
        Routing.RegisterRoute("ResetPasswordPage", typeof(Views.Auth.ResetPasswordPage));

        // ✅ Получаем сервис через MauiContext
        if (Handler?.MauiContext?.Services != null)
        {
            _authStateService = Handler.MauiContext.Services.GetService<IAuthStateService>();
        }

        // ✅ Подписываемся на событие навигации
        Navigating += OnNavigating;
    }

    // ✅ Обработчик навигации
    private async void OnNavigating(object sender, ShellNavigatingEventArgs e)
    {
        // Получаем целевой маршрут
        var targetRoute = e.Target.Location.OriginalString;

        // Если сервис не доступен — пропускаем проверку
        if (_authStateService == null) return;

        // 🔒 Защищенные маршруты (требуют аутентификации)
        var protectedRoutes = new[]
        {
            "SubjectsPage",
        };

        // Проверяем, является ли маршрут защищенным
        var isProtected = protectedRoutes.Any(route => targetRoute.Contains(route));

        if (isProtected && !_authStateService.IsAuthenticated)
        {
            // Отменяем навигацию
            e.Cancel();

            // Показываем сообщение
            await Application.Current.MainPage.DisplayAlert(
                "Доступ заборонено",
                "Будь ласка, увійдіть, щоб отримати доступ до цієї сторінки.",
                "OK");

            // Перенаправляем на страницу входа
            await GoToAsync("///LoginPage");
        }
        else if (targetRoute.Contains("LoginPage") && _authStateService.IsAuthenticated)
        {
            // ✅ Если пользователь уже авторизован, не пускаем на страницу входа
            e.Cancel();
            await GoToAsync("///HomePage");
        }
        else if (targetRoute.Contains("RegisterPage") && _authStateService.IsAuthenticated)
        {
            // ✅ Если пользователь уже авторизован, не пускаем на страницу регистрации
            e.Cancel();
            await GoToAsync("///HomePage");
        }
    }

    // ✅ Метод для проверки доступа к маршруту
    public static async Task<bool> CheckAccessAsync(string route)
    {
        var authState = Application.Current?.Handler?.MauiContext?.Services
            ?.GetService<IAuthStateService>();

        if (authState == null) return true;

        var protectedRoutes = new[]
        {
            "SubjectsPage",
        };

        var isProtected = protectedRoutes.Any(r => route.Contains(r));

        if (isProtected && !authState.IsAuthenticated)
        {
            await Shell.Current.DisplayAlert(
                "Доступ заборонено",
                "Будь ласка, увійдіть, щоб отримати доступ до цієї сторінки.",
                "OK");
            await Shell.Current.GoToAsync("///LoginPage");
            return false;
        }

        return true;
    }
}