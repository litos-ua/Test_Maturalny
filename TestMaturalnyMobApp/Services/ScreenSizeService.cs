using Microsoft.Maui.Devices;

namespace TestMaturalnyMobApp.Services;

public static class ScreenSizeService
{
    private static double _screenWidth;
    private static double _screenHeight;
    private static bool _isInitialized;

    public static double ScreenWidth => _screenWidth;
    public static double ScreenHeight => _screenHeight;
    public static bool IsInitialized => _isInitialized;

    public static void Initialize()
    {
        if (_isInitialized) return;

        var displayInfo = DeviceDisplay.Current.MainDisplayInfo;
        var density = displayInfo.Density;

        _screenWidth = displayInfo.Width / density;
        _screenHeight = displayInfo.Height / density;
        _isInitialized = true;

        System.Diagnostics.Debug.WriteLine($"📱 Screen size initialized: {_screenWidth}x{_screenHeight}");
    }

    public static void SubscribeToChanges()
    {
        DeviceDisplay.Current.MainDisplayInfoChanged += OnDisplayInfoChanged;
    }

    private static void OnDisplayInfoChanged(object sender, DisplayInfoChangedEventArgs e)
    {
        var density = e.DisplayInfo.Density;
        _screenWidth = e.DisplayInfo.Width / density;
        _screenHeight = e.DisplayInfo.Height / density;
        System.Diagnostics.Debug.WriteLine($"📱 SCREEN SIZE UPDATED: {_screenWidth}x{_screenHeight} at {DateTime.Now:HH:mm:ss.fff}");
    }
}
