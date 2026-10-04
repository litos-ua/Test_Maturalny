using System.Globalization;

namespace TestMaturalnyMobApp.Converters;

public class IndexToColorConverter : IValueConverter
{
    private static readonly Color[] Colors = new[]
    {
        Color.FromArgb("#CBB7FF"), // videoLabel
        Color.FromArgb("#B0E0FF"), // podcastLabel
        Color.FromArgb("#FFD580"), // quizLabel
        Color.FromArgb("#B0E0FF"), // outcard
        Color.FromArgb("#B0E0FF"), // outcard
        Color.FromArgb("#FFD580"), // quizLabel
        Color.FromArgb("#B0E0FF"), // podcastLabel
        Color.FromArgb("#CBB7FF")  // videoLabel
    };

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is int index)
        {
            return Colors[index % Colors.Length];
        }
        return Colors[0];
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}