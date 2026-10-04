using System.Collections.ObjectModel;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public partial class QuestionSingleChoice : QuestionBase
{
    public ObservableCollection<AnswerOption> Options { get; } = new();

    private int _selectedOptionId;
    public int SelectedOptionId
    {
        get => _selectedOptionId;
        set
        {
            if (_selectedOptionId != value)
            {
                _selectedOptionId = value;
                OnPropertyChanged();

                // ✅ Вызываем AnswerCommand при изменении выбора
                if (AnswerCommand != null && Question != null)
                {
                    System.Diagnostics.Debug.WriteLine($"🔘 Вызов AnswerCommand: вопрос {Question.Id}, option {value}");
                    AnswerCommand.Execute(new object[] { Question.Id, new List<int> { value } });
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine($"❌ AnswerCommand is NULL или Question is NULL!");
                }
            }
        }
    }

    public QuestionSingleChoice()
    {
        InitializeComponent();
        System.Diagnostics.Debug.WriteLine("🟢 QuestionSingleChoice CONSTRUCTOR");
    }

    public override void OnQuestionChanged()
    {
        System.Diagnostics.Debug.WriteLine("🔵 QuestionSingleChoice.OnQuestionChanged() ВЫЗВАН!");
        System.Diagnostics.Debug.WriteLine($"   Question = {Question?.Id}, Text = {Question?.Text?.Substring(0, Math.Min(30, Question?.Text?.Length ?? 0))}...");

        Options.Clear();
        if (Question?.Options != null)
        {
            foreach (var opt in Question.Options)
            {
                // ✅ Восстанавливаем состояние IsSelected из SavedAnswer
                opt.IsSelected = SavedAnswer?.Contains(opt.Id) ?? false;
                Options.Add(opt);
                System.Diagnostics.Debug.WriteLine($"   Option: Id={opt.Id}, Text={opt.Text}, IsSelected={opt.IsSelected}");
            }
        }
        System.Diagnostics.Debug.WriteLine($"   Options count = {Options.Count}");

        // ✅ Восстанавливаем SelectedOptionId из SavedAnswer
        if (SavedAnswer != null && SavedAnswer.Any())
        {
            var savedId = SavedAnswer.FirstOrDefault();
            if (savedId > 0)
            {
                System.Diagnostics.Debug.WriteLine($"   ✅ Восстанавливаем SelectedOptionId = {savedId}");
                _selectedOptionId = savedId;
                OnPropertyChanged(nameof(SelectedOptionId));
            }
            else
            {
                _selectedOptionId = 0;
                OnPropertyChanged(nameof(SelectedOptionId));
            }
        }
        else
        {
            _selectedOptionId = 0;
            OnPropertyChanged(nameof(SelectedOptionId));
        }

        OnPropertyChanged(nameof(Options));
    }

    private void OnOptionChecked(object sender, CheckedChangedEventArgs e)
    {
        if (e.Value && sender is RadioButton radio)
        {
            if (radio.BindingContext is AnswerOption option)
            {
                System.Diagnostics.Debug.WriteLine($"🔘 Выбран вариант: Id={option.Id}");

                if (AnswerCommand != null && Question != null)
                {
                    AnswerCommand.Execute(new object[] { Question.Id, new List<int> { option.Id } });
                    System.Diagnostics.Debug.WriteLine($"   ✅ AnswerCommand выполнен");
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine($"   ❌ AnswerCommand is NULL или Question is NULL!");
                    System.Diagnostics.Debug.WriteLine($"   AnswerCommand: {AnswerCommand?.GetType()}");
                    System.Diagnostics.Debug.WriteLine($"   Question: {Question?.Id}");
                }
            }
        }
    }
}