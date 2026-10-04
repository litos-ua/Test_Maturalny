using System.Globalization;
using TestMaturalnyMobApp.Constants;

namespace TestMaturalnyMobApp.Converters;

public class RelativeToAbsoluteUrlConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is string path && !string.IsNullOrEmpty(path))
        {
            // ✅ Если это уже полный URL — возвращаем как есть
            if (path.StartsWith("http://") || path.StartsWith("https://"))
                return path;

            // ✅ Если это относительный путь — добавляем базовый URL
            if (path.StartsWith("/images/") || path.StartsWith("images/"))
                return ApiConfig.GetFullImageUrl(path);
        }
        return value ?? string.Empty;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}