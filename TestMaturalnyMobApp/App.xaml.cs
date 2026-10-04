using TestMaturalnyMobApp.Services;
#if WINDOWS
using Microsoft.UI.Windowing;
using Windows.Graphics;
using WinRT.Interop;
#endif

namespace TestMaturalnyMobApp;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        Application.Current!.UserAppTheme = AppTheme.Light;
        System.Diagnostics.Debug.WriteLine($"🔵 APP START: {DateTime.Now:HH:mm:ss.fff}");

        // ✅ Инициализируем размер экрана
        ScreenSizeService.Initialize();
        System.Diagnostics.Debug.WriteLine($"📱 SCREEN SIZE: {ScreenSizeService.ScreenWidth}x{ScreenSizeService.ScreenHeight}");
        ScreenSizeService.SubscribeToChanges();

    }

    protected override Window CreateWindow(IActivationState? activationState)
    {
        var window = new Window(new AppShell());

        // ✅ Настройка для Windows
        if (DeviceInfo.Current.Platform == DevicePlatform.WinUI)
        {
            try
            {
#if WINDOWS
                var displayArea = DisplayArea.Primary;
                var screenWidth = displayArea.WorkArea.Width;
                var screenHeight = displayArea.WorkArea.Height;

                double widthPercent = 440.0 / 1920.0;
                double heightPercent = 840.0 / 1080.0;

                int windowWidth = (int)(screenWidth * widthPercent);
                int windowHeight = (int)(screenHeight * heightPercent);

                windowWidth = Math.Max(windowWidth, 320);
                windowHeight = Math.Max(windowHeight, 600);
                windowWidth = Math.Min(windowWidth, 800);
                windowHeight = Math.Min(windowHeight, 1200);

                window.Width = windowWidth;
                window.Height = windowHeight;

                window.Created += (s, e) => CenterWindow(window);
#endif
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Ошибка настройки окна: {ex.Message}");
            }
        }

        return window;
    }

#if WINDOWS
    private void CenterWindow(Window window)
    {
        try
        {
            var mauiWindow = window.Handler?.PlatformView as Microsoft.UI.Xaml.Window;
            if (mauiWindow == null) return;

            var handle = WinRT.Interop.WindowNative.GetWindowHandle(mauiWindow);
            var windowId = Microsoft.UI.Win32Interop.GetWindowIdFromWindow(handle);
            var appWindow = Microsoft.UI.Windowing.AppWindow.GetFromWindowId(windowId);

            if (appWindow == null) return;

            var displayArea = DisplayArea.Primary;
            var screenWidth = displayArea.WorkArea.Width;
            var screenHeight = displayArea.WorkArea.Height;

            var x = (int)((screenWidth - window.Width) / 2);
            var y = (int)((screenHeight - window.Height) / 2);

            appWindow.MoveAndResize(new RectInt32(x, y, (int)window.Width, (int)window.Height));

            System.Diagnostics.Debug.WriteLine($"📱 Window centered: {window.Width}x{window.Height} at ({x}, {y})");
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Ошибка центрирования окна: {ex.Message}");
        }
    }
#endif
}