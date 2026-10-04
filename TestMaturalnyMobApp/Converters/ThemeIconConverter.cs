using System.Globalization;

namespace TestMaturalnyMobApp.Converters;

public class ThemeIconConverter : IValueConverter
{
    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        return value is bool isDark ? (isDark ? "☀️" : "🌙") : "🌙";
    }

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}