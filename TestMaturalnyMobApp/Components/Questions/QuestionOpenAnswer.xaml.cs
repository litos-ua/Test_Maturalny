using System.Text.RegularExpressions;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public partial class QuestionOpenAnswer : QuestionBase
{
    private readonly List<Entry> _entries = new();
    private bool _isRestoring = false;

    // Как в React: только цифры и не более одной точки
    private static readonly Regex NumericPattern = new(@"^[0-9]*\.?[0-9]*$");

    public QuestionOpenAnswer()
    {
        InitializeComponent();
    }

    public override void OnQuestionChanged()
    {
        _isRestoring = true;

        InputsContainer.Clear();
        _entries.Clear();

        if (Question?.Options == null)
        {
            _isRestoring = false;
            return;
        }

        var correctOptions = Question.Options.Where(o => o.IsCorrect).ToList();
        var fieldsCount = correctOptions.Count;

        for (int i = 0; i < fieldsCount; i++)
        {
            var label = new Label
            {
                Text = fieldsCount > 1 ? $"{i + 1})" : "",
                VerticalOptions = LayoutOptions.Center,
                FontSize = 15,
                TextColor = (Color)Application.Current.Resources[
                    Application.Current.RequestedTheme == AppTheme.Dark
                        ? "DarkOptionsTextColor"
                        : "LightOptionsTextColor"]
            };

            var entry = new Entry
            {
                Placeholder = fieldsCount > 1 ? $"Відповідь {i + 1}" : "Введіть відповідь",
                Keyboard = Keyboard.Numeric,
                Text = (SavedTextAnswer != null && i < SavedTextAnswer.Count)
                        ? SavedTextAnswer[i] ?? ""
                        : "",
                TextColor = (Color)Application.Current.Resources[
                    Application.Current.RequestedTheme == AppTheme.Dark
                        ? "DarkOptionsTextColor"
                        : "LightOptionsTextColor"]
            };

            entry.TextChanged += OnEntryTextChanged;
            _entries.Add(entry);

            var row = new Grid
            {
                ColumnDefinitions = new ColumnDefinitionCollection
                {
                    new ColumnDefinition(GridLength.Auto),
                    new ColumnDefinition(GridLength.Star)
                },
                ColumnSpacing = 8,
                Padding = new Thickness(8, 4),
                BackgroundColor = (Color)Application.Current.Resources[
                    Application.Current.RequestedTheme == AppTheme.Dark
                        ? "DarkOptionsBackgroundColor"
                        : "LightOptionsBackgroundColor"]
            };

            Grid.SetColumn(label, 0);
            Grid.SetColumn(entry, 1);
            row.Add(label);
            row.Add(entry);

            InputsContainer.Add(row);
        }

        _isRestoring = false;
    }

    private void OnEntryTextChanged(object sender, TextChangedEventArgs e)
    {
        if (_isRestoring) return;

        // Валидация как в React: только цифры и одна точка
        if (!string.IsNullOrEmpty(e.NewTextValue) && !NumericPattern.IsMatch(e.NewTextValue))
        {
            if (sender is Entry entry)
            {
                _isRestoring = true;
                entry.Text = e.OldTextValue;
                _isRestoring = false;
            }
            return;
        }

        // Собираем все значения и отправляем
        var texts = _entries.Select(en => en.Text ?? "").ToList();
        TextAnswerCommand?.Execute(new object[] { Question?.Id, texts });
    }
}
