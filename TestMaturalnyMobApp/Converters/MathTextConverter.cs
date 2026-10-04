// Converters/MathTextConverter.cs
using System.Globalization;
using System.Text.RegularExpressions;

namespace TestMaturalnyMobApp.Converters;

public class MathTextConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is string text && !string.IsNullOrEmpty(text))
        {
            // Разбиваем текст на части: обычный текст и формулы в обратных кавычках
            var parts = Regex.Split(text, @"(`[^`]+`)");

            var result = new List<object>();

            foreach (var part in parts)
            {
                if (string.IsNullOrEmpty(part))
                    continue;

                if (part.StartsWith("`") && part.EndsWith("`"))
                {
                    // Это формула
                    var formula = part.Trim('`');
                    result.Add(new MathPart { IsFormula = true, Content = formula });
                }
                else
                {
                    // Это обычный текст
                    result.Add(new MathPart { IsFormula = false, Content = part });
                }
            }

            return result;
        }

        return new List<MathPart> { new MathPart { IsFormula = false, Content = value?.ToString() ?? string.Empty } };
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class MathPart
{
    public bool IsFormula { get; set; }
    public string Content { get; set; } = string.Empty; // только для обычного текста
    public string Formula { get; set; } = string.Empty; // только для формул

}
