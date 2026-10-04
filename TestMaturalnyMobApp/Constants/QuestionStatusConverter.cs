using System.Globalization;

namespace TestMaturalnyMobApp.Converters;

public class QuestionStatusConverter : IValueConverter
{
    private static readonly Color AnsweredColor = Color.FromArgb("#4CAF50");
    private static readonly Color CurrentColor = Color.FromArgb("#2196F3");
    private static readonly Color UnansweredColor = Color.FromArgb("#9E9E9E");

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is int index)
        {
            // TODO: Проверить, отвечен ли вопрос
            return UnansweredColor;
        }
        return UnansweredColor;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}
