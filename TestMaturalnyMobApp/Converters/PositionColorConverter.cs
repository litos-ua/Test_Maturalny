// Опция "Нет соответствия" внизу

using System.Globalization;

namespace TestMaturalnyMobApp.Converters;

public class PositionColorConverter : IValueConverter
{
    // Словарь цветов для разных позиций
    private static readonly Dictionary<int, Color> PositionColors = new()
    {
        { 0, Colors.Red },      // A
        { 1, Colors.Orange },   // B
        { 2, Colors.Green },    // C
        { 3, Colors.Blue },     // D
        { 4, Colors.Purple },   // E
        { 5, Colors.Teal },     // F
    };

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is int selectedIndex)
        {
            // Если ничего не выбрано (-1) - возвращаем серый
            if (selectedIndex < 0)
                return Colors.Gray;

            // Если индекс соответствует цвету в словаре - возвращаем цвет
            if (PositionColors.TryGetValue(selectedIndex, out var selectedColor))
                return selectedColor;

            // Все остальные случаи (⊗, выход за пределы) - серый
            return Colors.Gray;
        }

        return Colors.Gray;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }

    // ✅ Вспомогательный метод для получения полупрозрачного фона
    public static Color GetBackgroundColor(int selectedIndex)
    {
        if (selectedIndex < 0)
            return Colors.Transparent;

        if (PositionColors.TryGetValue(selectedIndex, out var bgColor))
            return bgColor.WithAlpha(0.2f);

        return Colors.Transparent;
    }

    // ✅ Вспомогательный метод для получения цвета текста
    public static Color GetTextColor(int selectedIndex)
    {
        if (selectedIndex < 0)
            return Colors.Gray;

        if (PositionColors.TryGetValue(selectedIndex, out var textColor))
            return textColor;

        return Colors.Gray;
    }
}