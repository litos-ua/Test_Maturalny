

using System.Collections.ObjectModel;
using System.Windows.Input;
using TestMaturalnyMobApp.Models;
using TestMaturalnyMobApp.Services;
using TestMaturalnyMobApp.Converters;

namespace TestMaturalnyMobApp.ViewModels;

public class TestSessionViewModel : BaseViewModel
{
    private readonly TestSessionService _sessionService;
    private int _disciplineId;
    private string _disciplineName = string.Empty;

    public ObservableCollection<Question> Questions => _sessionService.Questions;
    public Question? CurrentQuestion => _sessionService.CurrentQuestion;

    public string CurrentQuestionDisplayText =>
    CurrentQuestion?.Text?
        .Replace("<br>", "\n")
        .Replace("<br/>", "\n")
        .Replace("<br />", "\n")
        .Replace("\\n", "\n") ?? string.Empty;

    private int _currentIndex;
    public int CurrentIndex
    {
        get => _currentIndex;
        set
        {
            if (_currentIndex != value)
            {
                _sessionService.CurrentIndex = value;

                if (_currentIndex >= 0 && _currentIndex < Questions.Count)
                    Questions[_currentIndex].IsCurrent = false;

                _currentIndex = value;

                if (_currentIndex >= 0 && _currentIndex < Questions.Count)
                    Questions[_currentIndex].IsCurrent = true;

                OnPropertyChanged();
                OnPropertyChanged(nameof(CurrentQuestion));  // Для обновления текста вопроса - ОТЛАДКА!!!
                OnPropertyChanged(nameof(CurrentQuestionDisplayText));
                OnPropertyChanged(nameof(IsFirstQuestion));
                OnPropertyChanged(nameof(IsLastQuestion));

                LoadCurrentAnswer();
            }
        }
    }

    private string _timeText = "00:00";
    public string TimeText
    {
        get => _timeText;
        set { _timeText = value; OnPropertyChanged(); }
    }

    public bool IsFirstQuestion => CurrentIndex == 0;
    public bool IsLastQuestion => CurrentIndex >= Questions.Count - 1;
    public bool HasQuestions => Questions.Count > 0;

    private bool _isLoading = true;
    public bool IsLoading
    {
        get => _isLoading;
        set
        {
            _isLoading = value;
            OnPropertyChanged();
        }
    }

    private bool _showResults = false;
    public bool ShowResults
    {
        get => _showResults;
        set
        {
            _showResults = value;
            OnPropertyChanged();
        }
    }

    private TestResult? _testResult;
    public TestResult? TestResult
    {
        get => _testResult;
        set { _testResult = value; OnPropertyChanged(); }
    }

    public ICommand GoToPreviousCommand { get; }
    public ICommand GoToNextCommand { get; }
    public ICommand SaveAnswerCommand { get; }
    public ICommand SaveCurrentAnswerCommand { get; }
    public ICommand SaveTextAnswerCommand { get; }  // расширение под текстовые ответы для OpenAnswer
    public ICommand CompleteTestCommand { get; }
    public ICommand GoHomeCommand { get; }
    public ICommand GoToTestSelectionCommand { get; }

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

                if (_sessionService.CurrentQuestion != null)
                {
                    var questionId = _sessionService.CurrentQuestion.Id;
                    _sessionService.SaveAnswer(questionId, new List<int> { value });
                }
            }
        }
    }

    public TestSessionViewModel(TestSessionService sessionService)
    {
        _sessionService = sessionService;

        // ✅ Команды без async
        SaveAnswerCommand = new Command<object[]>(OnSaveAnswerCommand);
        SaveCurrentAnswerCommand = new Command(SaveCurrentAnswer);
        CompleteTestCommand = new Command(CompleteTest);
        SaveTextAnswerCommand = new Command<object[]>(OnSaveTextAnswerCommand);  // расширение под текстовые ответы для OpenAnswer
        QuestionToViewConverter.GlobalTextAnswerCommand = SaveTextAnswerCommand; // расширение под текстовые ответы для OpenAnswer
        QuestionToViewConverter.GlobalGetTextAnswer = GetTextAnswer;             // расширение под текстовые ответы для OpenAnswer

        QuestionToViewConverter.GlobalAnswerCommand = SaveAnswerCommand;
        QuestionToViewConverter.GlobalGetAnswer = GetAnswer;

        ShowResults = false;

        GoToPreviousCommand = new Command(OnGoToPrevious);
        GoToNextCommand = new Command(OnGoToNext);
        GoHomeCommand = new Command(async () => await Shell.Current.GoToAsync("///HomePage", false));
        GoToTestSelectionCommand = new Command(async () => await Shell.Current.GoToAsync("///TestSelectionPage", false));

        _sessionService.OnQuestionsLoaded += () =>
        {
            IsLoading = false;
            CurrentIndex = 0;
            ShowResults = false;
            OnPropertyChanged(nameof(CurrentQuestion));
            OnPropertyChanged(nameof(CurrentQuestionDisplayText)); // Для обновления текста вопроса - ОТЛАДКА!!!
            OnPropertyChanged(nameof(HasQuestions));
            LoadCurrentAnswer();
        };

        _sessionService.OnTimeUpdated += (seconds) =>
        {
            var minutes = seconds / 60;
            var secs = seconds % 60;
            TimeText = $"{minutes:00}:{secs:00}";
        };

        _sessionService.OnTestCompleted += (result) =>
        {
            TestResult = result;
            ShowResults = true;
        };
    }

    private void OnSaveAnswerCommand(object[] parameters)
    {
        if (parameters != null && parameters.Length == 2)
        {
            if (parameters[0] is int questionId && parameters[1] is List<int> selectedIds)
            {
                _sessionService.SaveAnswer(questionId, selectedIds);
            }
        }
    }

    // расширение под текстовые ответы для OpenAnswer
    private void OnSaveTextAnswerCommand(object[] parameters)
    {
        if (parameters != null
            && parameters.Length == 2
            && parameters[0] is int questionId
            && parameters[1] is List<string> texts)
        {
            _sessionService.SaveTextAnswer(questionId, texts);
        }
    }

    public List<string> GetTextAnswer(int questionId)
        => _sessionService.GetTextAnswer(questionId);

    public List<int> GetAnswer(int questionId)
    {
        return _sessionService.GetAnswer(questionId);
    }

  

    public async Task LoadTest(int disciplineId, string disciplineName, bool isTopicTest = false, int? topicId = null)
    {
        _disciplineId = disciplineId;
        _disciplineName = disciplineName;
        IsLoading = true;
        ShowResults = false;

        try
        {
            if (isTopicTest && topicId.HasValue)
            {
                await _sessionService.LoadQuestionsByTopic(topicId.Value);
            }
            else
            {
                await _sessionService.LoadQuestionsByDiscipline(disciplineId);
            }
        }
        catch (Exception ex)
        {
            await Application.Current.MainPage.DisplayAlert("Ошибка", $"Не удалось загрузить вопросы: {ex.Message}", "OK");
            IsLoading = false;
        }
    }

    private void OnGoToPrevious()
    {
        _sessionService.GoToPrevious();
        CurrentIndex = _sessionService.CurrentIndex;
        LoadCurrentAnswer();
    }

    private void OnGoToNext()
    {
        _sessionService.GoToNext();
        CurrentIndex = _sessionService.CurrentIndex;
        LoadCurrentAnswer();
    }

    // Проверка по каждому типу вопроса — есть ли валидный ответ.

    private async void SaveCurrentAnswer()
    {
        try
        {
            if (CurrentQuestion == null)
            {
                await Application.Current.MainPage.DisplayAlert(
                    "Увага!", "Немає активного питання.", "OK");
                return;
            }

            var questionId = CurrentQuestion.Id;

            // ✅ Валидация по типу вопроса
            if (!ValidateCurrentAnswer(questionId, out var errorMessage))
            {
                await Application.Current.MainPage.DisplayAlert(
                    "Увага!", errorMessage, "OK");
                return;
            }

            // ✅ Явное сохранение (для типов, которые могут ещё не успеть сохраниться)
            //    По факту все компоненты сохраняют автоматически, но для SingleChoice
            //    подстрахуемся — там SelectedOptionId живёт отдельно.
            if (CurrentQuestion.Type == TestMaturalnyMobApp.Models.QuestionType.SingleChoice && SelectedOptionId > 0)
            {
                _sessionService.SaveAnswer(questionId, new List<int> { SelectedOptionId });
            }

            // ✅ Переход к следующему вопросу, если он есть
            if (CurrentIndex < Questions.Count - 1)
            {
                _sessionService.GoToNext();
                CurrentIndex = _sessionService.CurrentIndex;
                LoadCurrentAnswer();
            }
            else
            {
                // Последний вопрос — сообщаем, что дальше нужно завершать
                await Application.Current.MainPage.DisplayAlert(
                    "Успішно!",
                    "Відповідь збережено. Це останнє питання — натисніть «Завершити».",
                    "OK");
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Ошибка SaveCurrentAnswer: {ex.Message}");
        }
    }

    /// <summary>
    /// Проверяет, валиден ли ответ на текущий вопрос.
    /// Возвращает true и пустое сообщение, если всё в порядке;
    /// false и текст ошибки — если что-то не так.
    /// </summary>
    private bool ValidateCurrentAnswer(int questionId, out string errorMessage)
    {
        errorMessage = string.Empty;

        if (CurrentQuestion == null)
        {
            errorMessage = "Немає активного питання.";
            return false;
        }

        var answer = _sessionService.GetAnswer(questionId);
        var textAnswer = _sessionService.GetTextAnswer(questionId);

        switch (CurrentQuestion.Type)
        {
            case TestMaturalnyMobApp.Models.QuestionType.SingleChoice:
                if (answer == null || answer.Count == 0 || answer[0] <= 0)
                {
                    errorMessage = "Будь ласка, оберіть одну відповідь.";
                    return false;
                }
                break;

            case TestMaturalnyMobApp.Models.QuestionType.MultipleChoice:
                if (answer == null || !answer.Any(id => id > 0))
                {
                    errorMessage = "Будь ласка, оберіть хоча б одну відповідь.";
                    return false;
                }
                if (answer.Count != answer.Distinct().Count())
                {
                    errorMessage = "Вибрані відповіді не повинні повторюватися.";
                    return false;
                }
                break;

            case TestMaturalnyMobApp.Models.QuestionType.DoubleChoice:
                if (answer == null || answer.Count != 2)
                {
                    errorMessage = "Будь ласка, введіть обидві відповіді.";
                    return false;
                }
                if (answer.Any(v => v == 0))
                {
                    errorMessage = "Будь ласка, заповніть обидва поля.";
                    return false;
                }
                break;

            case TestMaturalnyMobApp.Models.QuestionType.Matching:
                {
                    var total = CurrentQuestion.Options.Count;
                    if (answer == null || answer.Count != total)
                    {
                        errorMessage = "Будь ласка, оберіть відповідь для кожного елементу.";
                        return false;
                    }
                    // 0 — не выбрано, -1 — явный «⊗», оба считаем «не выбрано»
                    if (answer.Any(v => v == 0))
                    {
                        errorMessage = "Будь ласка, оберіть відповідь для кожного елементу.";
                        return false;
                    }
                    break;
                }

            case TestMaturalnyMobApp.Models.QuestionType.CorrectSequence:
                {
                    var total = CurrentQuestion.Options.Count;
                    if (answer == null || answer.Count != total)
                    {
                        errorMessage = "Будь ласка, встановіть позицію для кожного елементу.";
                        return false;
                    }
                    // Позиции должны быть в диапазоне 1..N
                    if (answer.Any(v => v < 1 || v > total))
                    {
                        errorMessage = "Будь ласка, встановіть позицію для кожного елементу.";
                        return false;
                    }
                    if (answer.Distinct().Count() != answer.Count)
                    {
                        errorMessage = "Позиції не повинні повторюватися.";
                        return false;
                    }
                    break;
                }

            case TestMaturalnyMobApp.Models.QuestionType.OpenAnswer:
                if (textAnswer == null || !textAnswer.Any(t => !string.IsNullOrWhiteSpace(t)))
                {
                    errorMessage = "Будь ласка, введіть відповідь.";
                    return false;
                }
                break;

            default:
                errorMessage = "Невідомий тип питання.";
                return false;
        }

        return true;
    }

    private async void CompleteTest()
    {
        try
        {
            var total = Questions.Count;

            // ✅ Перед подсчётом пересчитываем флаги IsAnswered из данных —
            //    это защита от возможного рассинхрона между данными и флагом
            //    (например, если в будущем появится прямая запись в _answers/_textAnswers).
            _sessionService.RecalculateAnsweredFlags();

            // ✅ Используем флаг IsAnswered вопросов (он уже корректно ставится
            //    и для числовых, и для текстовых ответов)
            var answered = Questions.Count(q => q.IsAnswered);

            if (answered < total)
            {
                var confirm = await Application.Current.MainPage.DisplayAlert(
                    "Увага!",
                    $"Ви відповіли на {answered} з {total} запитань. Завершити тест?",
                    "Так", "Ні");

                if (!confirm)
                    return;
            }

            _sessionService.CompleteTest();
            ShowResults = true;
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ Ошибка CompleteTest: {ex.Message}");
        }
    }


    // Проверяем тип вопроса чтобы не производить перезапись в CorrectSequence, Matching, DoubleChoice


    // Проверяем тип вопроса чтобы не производить перезапись в CorrectSequence, Matching, DoubleChoice
    private void LoadCurrentAnswer()
    {
        if (CurrentQuestion == null) return;

        // ✅ ТОЛЬКО ДЛЯ SingleChoice
        if (CurrentQuestion.Type == TestMaturalnyMobApp.Models.QuestionType.SingleChoice)
        {
            var answer = _sessionService.GetAnswer(CurrentQuestion.Id);
            SelectedOptionId = answer != null && answer.Any() ? answer.FirstOrDefault() : 0;
        }
        // Для CorrectSequence, Matching, MultipleChoice, DoubleChoice - НЕ ТРОГАЕМ SelectedOptionId
    }
}