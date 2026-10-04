using TestMaturalnyMobApp.ViewModels;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Views;

[QueryProperty(nameof(DisciplineId), "disciplineId")]
[QueryProperty(nameof(DisciplineName), "name")]
public partial class TestSessionPage : ContentPage
{
    private TestSessionViewModel _viewModel;
    private string _disciplineId;
    private string _disciplineName;

    public string DisciplineId
    {
        get => _disciplineId;
        set
        {
            _disciplineId = value;
            System.Diagnostics.Debug.WriteLine($"📥 DisciplineId: {value}");
        }
    }

    public string DisciplineName
    {
        get => _disciplineName;
        set
        {
            _disciplineName = value;
            System.Diagnostics.Debug.WriteLine($"📥 DisciplineName: {value}");
        }
    }

    public TestSessionPage(TestSessionViewModel viewModel)
    {
        InitializeComponent();
        _viewModel = viewModel;
        BindingContext = _viewModel;

        System.Diagnostics.Debug.WriteLine($"📄 TestSessionPage создан");
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();

        System.Diagnostics.Debug.WriteLine($"📥 OnAppearing: DisciplineId={DisciplineId}, DisciplineName={DisciplineName}");

        if (!string.IsNullOrEmpty(DisciplineId) && int.TryParse(DisciplineId, out var id))
        {
            var name = string.IsNullOrEmpty(DisciplineName) ? "Тест" : DisciplineName;

            // ✅ ОБНОВЛЯЕМ ЗАГОЛОВОК
            var headerLabel = this.FindByName<Label>("HeaderLabel");
            if (headerLabel != null)
            {
                headerLabel.Text = $"Тестування: {name}";
            }

            await _viewModel.LoadTest(id, name);
        }
        else
        {
            await _viewModel.LoadTest(1, "Історія України");
        }
    }

    private void OnOptionChecked(object sender, CheckedChangedEventArgs e)
    {
        if (e.Value && sender is RadioButton radio)
        {
            if (radio.BindingContext is AnswerOption option)
            {
                _viewModel.SelectedOptionId = option.Id;

                // ✅ Отмечаем вопрос как отвеченный
                if (_viewModel.CurrentQuestion != null)
                {
                    var question = _viewModel.Questions.FirstOrDefault(q => q.Id == _viewModel.CurrentQuestion.Id);
                    if (question != null)
                    {
                        question.IsAnswered = true;
                    }
                }
            }
        }
    }

    private void OnQuestionIndicatorClicked(object sender, EventArgs e)
    {
        if (sender is Button button && button.CommandParameter is int displayNumber)
        {
            var index = displayNumber - 1;

            if (index >= 0 && index < _viewModel.Questions.Count)
            {
                _viewModel.CurrentIndex = index;
            }
        }
        else
        {
            System.Diagnostics.Debug.WriteLine("❌ Не удалось получить параметр!");
        }
    }
}



