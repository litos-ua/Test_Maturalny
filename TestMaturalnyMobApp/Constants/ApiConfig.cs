namespace TestMaturalnyMobApp.Constants;

public static class ApiConfig
{
    public static string PrimaryBaseUrl { get; set; } = "https://api.zno-nmt.com.ua/api/";
    public static string FallbackBaseUrl { get; set; } = "https://php.zno-nmt.com.ua/api/";
    public static string ImagesBaseUrl { get; set; } = "https://zno-nmt.com.ua/";

    private static string _currentBaseUrl = PrimaryBaseUrl;
    private static bool _isUsingFallback = false;

    public static string CurrentBaseUrl => _currentBaseUrl;
    public static bool IsUsingFallback => _isUsingFallback;

    public static void SwitchToFallback()
    {
        _isUsingFallback = true;
        _currentBaseUrl = FallbackBaseUrl;
        System.Diagnostics.Debug.WriteLine($"⚠️ Switched to fallback API: {_currentBaseUrl}");
    }

    public static void SwitchToPrimary()
    {
        _isUsingFallback = false;
        _currentBaseUrl = PrimaryBaseUrl;
        System.Diagnostics.Debug.WriteLine($"✅ Switched to primary API: {_currentBaseUrl}");
    }

    // ✅ Вспомогательный метод для формирования полного URL
    public static string GetFullImageUrl(string? relativePath)
    {
        if (string.IsNullOrEmpty(relativePath))
            return string.Empty;

        // Убираем ведущий слеш, если есть
        var path = relativePath.TrimStart('/');
        return $"{ImagesBaseUrl}{path}";
    }
}