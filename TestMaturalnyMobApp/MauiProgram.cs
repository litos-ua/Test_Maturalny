//using CommunityToolkit.Maui;
//using Microsoft.Extensions.Logging;
//using TestMaturalnyMobApp.Services;
//using TestMaturalnyMobApp.Services.Auth;
//using TestMaturalnyMobApp.ViewModels;
//using TestMaturalnyMobApp.ViewModels.Auth;

//namespace TestMaturalnyMobApp
//{
//    public static class MauiProgram
//    {
//        public static MauiApp CreateMauiApp()
//        {
//            var builder = MauiApp.CreateBuilder();
//            builder
//                .UseMauiApp<App>()
//                .UseMauiCommunityToolkit()
//                .ConfigureFonts(fonts =>
//                {
//                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
//                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
//                });

//#if DEBUG
//    		builder.Logging.AddDebug();
//#endif
//            // ✅ Регистрация сервисов
//            builder.Services.AddSingleton<ApiClient>();
//            builder.Services.AddSingleton<DisciplineService>();
//            builder.Services.AddSingleton<TopicService>();
//            builder.Services.AddSingleton<TestSessionService>();
//            builder.Services.AddSingleton<TopicService>();
//            builder.Services.AddSingleton<QuestionService>();
//            // =========  СЕРВИСЫ АУТЕНТИФИКАЦИИ ========
//            builder.Services.AddSingleton<AuthApiClient>();
//            builder.Services.AddSingleton<ITokenService, TokenService>();
//            builder.Services.AddSingleton<IAuthService, AuthService>();
//            builder.Services.AddSingleton<IAuthStateService, AuthStateService>();
//            // ===========================================


//            // ✅ Регистрация ViewModels
//            //builder.Services.AddTransient<BaseViewModel>();
//            builder.Services.AddTransient<HomePageViewModel>();
//            builder.Services.AddTransient<TestSelectionViewModel>();
//            builder.Services.AddTransient<TestSessionViewModel>();
//            builder.Services.AddTransient<LoginViewModel>();
//            builder.Services.AddTransient<RegisterViewModel>();
//            builder.Services.AddTransient<ForgotPasswordViewModel>();
//            builder.Services.AddTransient<ResetPasswordViewModel>();

//            //builder.ConfigureImageSources(services =>
//            //{
//            //    services.AddSingleton<IImageSourceService, FileImageSourceService>();
//            //});

//            builder.Logging.ClearProviders();

//            return builder.Build();
//        }
//    }
//}


// добавляем Android-хендлер для поля ввода (ввод точки)


using CommunityToolkit.Maui;
using Microsoft.Extensions.Logging;
using TestMaturalnyMobApp.Services;
using TestMaturalnyMobApp.Services.Auth;
using TestMaturalnyMobApp.ViewModels;
using TestMaturalnyMobApp.ViewModels.Auth;

namespace TestMaturalnyMobApp
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .UseMauiCommunityToolkit()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

#if DEBUG
            builder.Logging.AddDebug();
#endif

            // ✅ Android-хак: принудительно разрешаем ввод точки, запятой и минуса
            //    для всех Entry с Keyboard="Numeric". Иначе на части устройств
            //    клавиатура ориентируется на региональные настройки и блокирует '.'.
#if ANDROID
            Microsoft.Maui.Handlers.EntryHandler.Mapper.AppendToMapping(
                "NumericEntryDecimalFix",
                (handler, entry) =>
                {
                    if (entry.Keyboard == Keyboard.Numeric)
                    {
                        handler.PlatformView.KeyListener =
                            Android.Text.Method.DigitsKeyListener
                                .GetInstance("0123456789-,.");
                    }
                });
#endif

            // ✅ Регистрация сервисов
            builder.Services.AddSingleton<ApiClient>();
            builder.Services.AddSingleton<DisciplineService>();
            builder.Services.AddSingleton<TopicService>();
            builder.Services.AddSingleton<TestSessionService>();
            builder.Services.AddSingleton<TopicService>();
            builder.Services.AddSingleton<QuestionService>();
            // =========  СЕРВИСЫ АУТЕНТИФИКАЦИИ ========
            builder.Services.AddSingleton<AuthApiClient>();
            builder.Services.AddSingleton<ITokenService, TokenService>();
            builder.Services.AddSingleton<IAuthService, AuthService>();
            builder.Services.AddSingleton<IAuthStateService, AuthStateService>();
            // ===========================================


            // ✅ Регистрация ViewModels
            //builder.Services.AddTransient<BaseViewModel>();
            builder.Services.AddTransient<HomePageViewModel>();
            builder.Services.AddTransient<TestSelectionViewModel>();
            builder.Services.AddTransient<TestSessionViewModel>();
            builder.Services.AddTransient<LoginViewModel>();
            builder.Services.AddTransient<RegisterViewModel>();
            builder.Services.AddTransient<ForgotPasswordViewModel>();
            builder.Services.AddTransient<ResetPasswordViewModel>();

            //builder.ConfigureImageSources(services =>
            //{
            //    services.AddSingleton<IImageSourceService, FileImageSourceService>();
            //});

            builder.Logging.ClearProviders();

            return builder.Build();
        }
    }
}
