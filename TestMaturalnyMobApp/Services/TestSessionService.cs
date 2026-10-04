//using System.Collections.ObjectModel;
//using TestMaturalnyMobApp.Models;
//using TestMaturalnyMobApp.Helpers;

//namespace TestMaturalnyMobApp.Services;

//public class TestSessionService
//{
//    private readonly QuestionService _questionService;
//    private List<Question> _questions = new();

//    private Dictionary<int, List<int>> _answers = new();  // ✅ Храним ответы в Dictionary (questionId -> List<int>)

//    private Dictionary<int, List<LeftItem>> _leftItemsMap = new(); // Храним leftItems для Matching и CorrectSequence

//    private int? _disciplineId;  // ✅ ID дисциплины для конфигурации

//    public ObservableCollection<Question> Questions { get; } = new();
//    public int CurrentIndex { get; set; } = 0;
//    public int TimeLeft { get; private set; } = 3600;
//    public Question? CurrentQuestion => Questions.Count > 0 ? Questions[CurrentIndex] : null;
//    public bool IsCompleted { get; private set; }

//    public event Action? OnQuestionsLoaded;
//    public event Action<int>? OnTimeUpdated;
//    public event Action<TestResult>? OnTestCompleted;

//    public TestSessionService(QuestionService questionService)
//    {
//        _questionService = questionService;
//    }

//    public async Task LoadQuestionsByDiscipline(int disciplineId, int count = 30)
//    {
//        _disciplineId = disciplineId;
//        var questions = await _questionService.GetRandomQuestionsByDiscipline(disciplineId, count);
//        InitializeQuestions(questions);
//    }

//    public async Task LoadQuestionsByTopic(int topicId)
//    {
//        _disciplineId = null;
//        var questions = await _questionService.GetQuestionsByTopic(topicId);
//        InitializeQuestions(questions);
//    }

//    // Без перемешивания опций внутри вопросов.
//    //private void InitializeQuestions(List<Question> questions)
//    //{
//    //    _questions = questions;
//    //    _answers.Clear();
//    //    _leftItemsMap.Clear();

//    //    // ✅ Инициализируем словарь ответов
//    //    foreach (var q in questions)
//    //    {
//    //        _answers[q.Id] = new List<int>();
//    //    }

//    //    // ✅ Строим leftItemsMap для Matching и CorrectSequence
//    //    BuildLeftItemsMap(questions);

//    //    Questions.Clear();
//    //    for (int i = 0; i < questions.Count; i++)
//    //    {
//    //        var q = questions[i];
//    //        q.DisplayNumber = i + 1;
//    //        q.IsAnswered = false;  // ✅ Все вопросы не отвечены
//    //        q.IsCurrent = (i == 0);  // ✅ Первый вопрос — текущий
//    //        Questions.Add(q);
//    //    }

//    //    CurrentIndex = 0;
//    //    TimeLeft = questions.Count * 120;
//    //    IsCompleted = false;

//    //    OnQuestionsLoaded?.Invoke();
//    //    StartTimer();
//    //}

//    // ✅ Перемешивание опций внутри каждого вопроса (как в React). В вопросах типа Matching требуется дополнительное перемешивание.
//    private void InitializeQuestions(List<Question> questions)
//    {
//        // ✅ Перемешиваем опции внутри каждого вопроса (как в React)
//        var shuffledQuestions = questions.Select(q => new Question
//        {
//            Id = q.Id,
//            Text = q.Text,
//            ImageUrl = q.ImageUrl,
//            Type = q.Type,
//            MaxScore = q.MaxScore,
//            Difficulty = q.Difficulty,
//            TopicId = q.TopicId,
//            Options = ShuffleHelper.Shuffle(q.Options)
//        }).ToList();

//        _questions = shuffledQuestions;
//        _answers.Clear();
//        _leftItemsMap.Clear();

//        // ✅ Инициализируем словарь ответов
//        foreach (var q in shuffledQuestions)
//        {
//            _answers[q.Id] = new List<int>();
//        }

//        // ✅ Строим leftItemsMap для Matching и CorrectSequence
//        BuildLeftItemsMap(shuffledQuestions);

//        Questions.Clear();
//        for (int i = 0; i < shuffledQuestions.Count; i++)
//        {
//            var q = shuffledQuestions[i];
//            q.DisplayNumber = i + 1;
//            q.IsAnswered = false;  // ✅ Все вопросы не отвечены
//            q.IsCurrent = (i == 0);  // ✅ Первый вопрос — текущий
//            Questions.Add(q);
//        }

//        CurrentIndex = 0;
//        TimeLeft = shuffledQuestions.Count * 120;
//        IsCompleted = false;

//        OnQuestionsLoaded?.Invoke();
//        StartTimer();
//    }

//    private void BuildLeftItemsMap(List<Question> questions)
//    {
//        foreach (var q in questions.Where(q => q.Type == QuestionType.Matching || q.Type == QuestionType.CorrectSequence))
//        {
//            var leftItems = new List<LeftItem>();

//            foreach (var opt in q.Options)
//            {
//                leftItems.Add(new LeftItem
//                {
//                    Id = opt.Id,
//                    Text = opt.Text,
//                    MatchLabel = opt.MatchLabel
//                });
//            }

//            _leftItemsMap[q.Id] = leftItems;
//        }
//    }

//    private System.Timers.Timer? _timer;

//    private void StartTimer()
//    {
//        _timer?.Stop();
//        _timer = new System.Timers.Timer(1000);
//        _timer.Elapsed += (s, e) =>
//        {
//            MainThread.BeginInvokeOnMainThread(() =>
//            {
//                TimeLeft--;
//                OnTimeUpdated?.Invoke(TimeLeft);

//                if (TimeLeft <= 0)
//                {
//                    _timer?.Stop();
//                    CompleteTest();
//                }
//            });
//        };
//        _timer.Start();
//    }

//    public void GoToPrevious()
//    {
//        if (CurrentIndex > 0)
//        {
//            // ✅ Снимаем флаг IsCurrent с текущего вопроса
//            if (CurrentIndex < Questions.Count)
//                Questions[CurrentIndex].IsCurrent = false;

//            CurrentIndex--;

//            // ✅ Устанавливаем флаг IsCurrent на новый вопрос
//            if (CurrentIndex < Questions.Count)
//                Questions[CurrentIndex].IsCurrent = true;
//        }
//    }

//    public void GoToNext()
//    {
//        if (CurrentIndex < Questions.Count - 1)
//        {
//            // ✅ Снимаем флаг IsCurrent с текущего вопроса
//            if (CurrentIndex < Questions.Count)
//                Questions[CurrentIndex].IsCurrent = false;

//            CurrentIndex++;

//            // ✅ Устанавливаем флаг IsCurrent на новый вопрос
//            if (CurrentIndex < Questions.Count)
//                Questions[CurrentIndex].IsCurrent = true;
//        }
//    }

//    /// <summary>
//    /// Сохраняет ответ для вопроса
//    /// </summary>
//    public void SaveAnswer(int questionId, List<int> selectedIds)
//    {
//        //System.Diagnostics.Debug.WriteLine($"💾💾💾 SaveAnswer: вопрос {questionId}");
//        //System.Diagnostics.Debug.WriteLine($"   Получено для сохранения: [{string.Join(",", selectedIds ?? new List<int>())}]");
//        //System.Diagnostics.Debug.WriteLine($"   Текущее значение в словаре: [{string.Join(",", _answers.TryGetValue(questionId, out var current) ? current : new List<int>())}]");
//        if (_answers.ContainsKey(questionId))
//        {
//            _answers[questionId] = selectedIds ?? new List<int>();

//            // ОБНОВЛЯЕМ IsAnswered для вопроса
//            var question = Questions.FirstOrDefault(q => q.Id == questionId);
//            if (question != null)
//            {
//                question.IsAnswered = selectedIds != null && selectedIds.Any(id => id > 0);
//                //System.Diagnostics.Debug.WriteLine($"📌 Вопрос {questionId}: IsAnswered = {question.IsAnswered} (hasAnswer={selectedIds != null && selectedIds.Any(id => id > 0)})");
//            }

//            System.Diagnostics.Debug.WriteLine($"   Новое значение в словаре: [{string.Join(",", _answers[questionId])}]");
//        }
//    }

//    /// <summary>
//    /// Получает ответ для вопроса
//    /// </summary>
//    public List<int> GetAnswer(int questionId)
//    {
//        //System.Diagnostics.Debug.WriteLine($"📖 GetAnswer: questionId={questionId}, answer=[{string.Join(",", _answers.TryGetValue(questionId, out var value) ? value : new List<int>())}]");
//        return _answers.TryGetValue(questionId, out var answer) ? answer : new List<int>();
//    }

//    /// <summary>
//    /// Получает все ответы
//    /// </summary>
//    public Dictionary<int, List<int>> GetAllAnswers()
//    {
//        return new Dictionary<int, List<int>>(_answers);
//    }

//    /// <summary>
//    /// Проверяет, отвечен ли вопрос по индексу
//    /// </summary>
//    public bool IsQuestionAnswered(int index)
//    {
//        if (index < 0 || index >= Questions.Count)
//            return false;

//        var q = Questions[index];
//        return _answers.TryGetValue(q.Id, out var answer) && answer != null && answer.Any(id => id > 0);
//    }

//    public void CompleteTest()
//    {
//        if (IsCompleted) return;

//        IsCompleted = true;
//        _timer?.Stop();

//        var result = CalculateResults();
//        OnTestCompleted?.Invoke(result);
//    }

//    private TestResult CalculateResults()
//    {
//        return TestCalculator.CalculateResults(
//            Questions.ToList(),
//            _answers,
//            _leftItemsMap,
//            _disciplineId
//        );
//    }

//    public void ResetTest()
//    {
//        _answers.Clear();
//        _leftItemsMap.Clear();
//        _questions.Clear();
//        Questions.Clear();
//        CurrentIndex = 0;
//        TimeLeft = 0;
//        IsCompleted = false;
//        _timer?.Stop();
//    }

//    /// <summary>
//    /// Выводит текущие сохраненные опции вопроса.
//    /// </summary>
//    public void DebugPrintAnswer(int questionId)
//    {
//        var answer = GetAnswer(questionId);
//        System.Diagnostics.Debug.WriteLine($"🔍 GetAnswer для вопроса {questionId}: [{string.Join(",", answer)}]");
//    }
//}



using System.Collections.ObjectModel;
using TestMaturalnyMobApp.Models;
using TestMaturalnyMobApp.Helpers;

namespace TestMaturalnyMobApp.Services;

public class TestSessionService
{
    private readonly QuestionService _questionService;
    private List<Question> _questions = new();

    private Dictionary<int, List<int>> _answers = new();  // ✅ Храним ответы в Dictionary (questionId -> List<int>)

    // ✅ Храним текстовые ответы для OpenAnswer (questionId -> List<string>)
    private Dictionary<int, List<string>> _textAnswers = new(); // ✅ Добавлено: второй словарь для текстовых ответов

    private Dictionary<int, List<LeftItem>> _leftItemsMap = new(); // Храним leftItems для Matching и CorrectSequence

    private int? _disciplineId;  // ✅ ID дисциплины для конфигурации

    public ObservableCollection<Question> Questions { get; } = new();
    public int CurrentIndex { get; set; } = 0;
    public int TimeLeft { get; private set; } = 3600;
    public Question? CurrentQuestion => Questions.Count > 0 ? Questions[CurrentIndex] : null;
    public bool IsCompleted { get; private set; }

    public event Action? OnQuestionsLoaded;
    public event Action<int>? OnTimeUpdated;
    public event Action<TestResult>? OnTestCompleted;

    public TestSessionService(QuestionService questionService)
    {
        _questionService = questionService;
    }

    public async Task LoadQuestionsByDiscipline(int disciplineId, int count = 30)
    {
        _disciplineId = disciplineId;
        var questions = await _questionService.GetRandomQuestionsByDiscipline(disciplineId, count);
        InitializeQuestions(questions);
    }

    public async Task LoadQuestionsByTopic(int topicId)
    {
        _disciplineId = null;
        var questions = await _questionService.GetQuestionsByTopic(topicId);
        InitializeQuestions(questions);
    }

    // ✅ Перемешивание опций внутри каждого вопроса (как в React). В вопросах типа Matching требуется дополнительное перемешивание.
    private void InitializeQuestions(List<Question> questions)
    {
        // ✅ Перемешиваем опции внутри каждого вопроса (как в React)
        var shuffledQuestions = questions.Select(q => new Question
        {
            Id = q.Id,
            Text = q.Text,
            ImageUrl = q.ImageUrl,
            Type = q.Type,
            MaxScore = q.MaxScore,
            Difficulty = q.Difficulty,
            TopicId = q.TopicId,
            Options = ShuffleHelper.Shuffle(q.Options)
        }).ToList();

        _questions = shuffledQuestions;
        _answers.Clear();
        _textAnswers.Clear();
        _leftItemsMap.Clear();

        // ✅ Инициализируем словарь ответов
        foreach (var q in shuffledQuestions)
        {
            _answers[q.Id] = new List<int>();

            // ✅ Для OpenAnswer инициализируем отдельный словарь текстовых ответов
            if (q.Type == QuestionType.OpenAnswer)
            {
                _textAnswers[q.Id] = new List<string>();
            }
        }

        // ✅ Строим leftItemsMap для Matching и CorrectSequence
        BuildLeftItemsMap(shuffledQuestions);

        Questions.Clear();
        for (int i = 0; i < shuffledQuestions.Count; i++)
        {
            var q = shuffledQuestions[i];
            q.DisplayNumber = i + 1;
            q.IsAnswered = false;  // ✅ Все вопросы не отвечены
            q.IsCurrent = (i == 0);  // ✅ Первый вопрос — текущий
            Questions.Add(q);
        }

        CurrentIndex = 0;
        TimeLeft = shuffledQuestions.Count * 120;
        IsCompleted = false;

        OnQuestionsLoaded?.Invoke();
        StartTimer();
    }

    private void BuildLeftItemsMap(List<Question> questions)
    {
        foreach (var q in questions.Where(q => q.Type == QuestionType.Matching || q.Type == QuestionType.CorrectSequence))
        {
            var leftItems = new List<LeftItem>();

            foreach (var opt in q.Options)
            {
                leftItems.Add(new LeftItem
                {
                    Id = opt.Id,
                    Text = opt.Text,
                    MatchLabel = opt.MatchLabel
                });
            }

            _leftItemsMap[q.Id] = leftItems;
        }
    }

    private System.Timers.Timer? _timer;

    private void StartTimer()
    {
        _timer?.Stop();
        _timer = new System.Timers.Timer(1000);
        _timer.Elapsed += (s, e) =>
        {
            MainThread.BeginInvokeOnMainThread(() =>
            {
                TimeLeft--;
                OnTimeUpdated?.Invoke(TimeLeft);

                if (TimeLeft <= 0)
                {
                    _timer?.Stop();
                    CompleteTest();
                }
            });
        };
        _timer.Start();
    }

    public void GoToPrevious()
    {
        if (CurrentIndex > 0)
        {
            // ✅ Снимаем флаг IsCurrent с текущего вопроса
            if (CurrentIndex < Questions.Count)
                Questions[CurrentIndex].IsCurrent = false;

            CurrentIndex--;

            // ✅ Устанавливаем флаг IsCurrent на новый вопрос
            if (CurrentIndex < Questions.Count)
                Questions[CurrentIndex].IsCurrent = true;
        }
    }

    public void GoToNext()
    {
        if (CurrentIndex < Questions.Count - 1)
        {
            // ✅ Снимаем флаг IsCurrent с текущего вопроса
            if (CurrentIndex < Questions.Count)
                Questions[CurrentIndex].IsCurrent = false;

            CurrentIndex++;

            // ✅ Устанавливаем флаг IsCurrent на новый вопрос
            if (CurrentIndex < Questions.Count)
                Questions[CurrentIndex].IsCurrent = true;
        }
    }

    /// <summary>
    /// Сохраняет ответ для вопроса
    /// </summary>
    public void SaveAnswer(int questionId, List<int> selectedIds)
    {
        if (_answers.ContainsKey(questionId))
        {
            _answers[questionId] = selectedIds ?? new List<int>();

            // ОБНОВЛЯЕМ IsAnswered для вопроса
            var question = Questions.FirstOrDefault(q => q.Id == questionId);
            if (question != null)
            {
                question.IsAnswered = selectedIds != null && selectedIds.Any(id => id > 0);
            }

            System.Diagnostics.Debug.WriteLine($"   Новое значение в словаре: [{string.Join(",", _answers[questionId])}]");
        }
    }

    /// <summary>
    /// Сохраняет текстовый ответ для вопроса типа OpenAnswer.
    /// </summary>
    public void SaveTextAnswer(int questionId, List<string> texts)
    {
        if (!_textAnswers.ContainsKey(questionId))
            return;

        _textAnswers[questionId] = texts ?? new List<string>();

        // ОБНОВЛЯЕМ IsAnswered для вопроса: считается отвеченным,
        // если хотя бы одно поле содержит непустое значение
        var question = Questions.FirstOrDefault(q => q.Id == questionId);
        if (question != null)
        {
            question.IsAnswered = texts != null
                && texts.Any(t => !string.IsNullOrWhiteSpace(t));
        }

        System.Diagnostics.Debug.WriteLine(
            $"   Новое текстовое значение в словаре: [{string.Join(",", _textAnswers[questionId])}]");
    }

    /// <summary>
    /// Получает ответ для вопроса
    /// </summary>
    public List<int> GetAnswer(int questionId)
    {
        return _answers.TryGetValue(questionId, out var answer) ? answer : new List<int>();
    }

    /// <summary>
    /// Получает текстовый ответ для вопроса типа OpenAnswer.
    /// </summary>
    public List<string> GetTextAnswer(int questionId)
    {
        return _textAnswers.TryGetValue(questionId, out var texts) ? texts : new List<string>();
    }

    /// <summary>
    /// Получает все ответы
    /// </summary>
    public Dictionary<int, List<int>> GetAllAnswers()
    {
        return new Dictionary<int, List<int>>(_answers);
    }

    /// <summary>
    /// Получает все текстовые ответы (для OpenAnswer).
    /// </summary>
    public Dictionary<int, List<string>> GetAllTextAnswers()
    {
        return new Dictionary<int, List<string>>(_textAnswers);
    }

    /// <summary>
    /// Проверяет, отвечен ли вопрос по индексу
    /// </summary>

    public bool IsQuestionAnswered(int index)
    {
        if (index < 0 || index >= Questions.Count)
            return false;

        var q = Questions[index];
        return _answers.TryGetValue(q.Id, out var answer) && answer != null && answer.Any(id => id > 0);
    }

    public void CompleteTest()
    {
        if (IsCompleted) return;

        IsCompleted = true;
        _timer?.Stop();

        var result = CalculateResults();
        OnTestCompleted?.Invoke(result);
    }

    private TestResult CalculateResults()
    {
        return TestCalculator.CalculateResults(
            Questions.ToList(),
            _answers,
            _leftItemsMap,
            _disciplineId,
            _textAnswers  // ← новый параметр
        );
    }

    /// <summary>
    /// Пересчитывает IsAnswered для всех вопросов на основе текущих данных.
    /// Полезно вызывать перед завершением теста — как защита от рассинхрона
    /// между данными (_answers / _textAnswers) и флагом IsAnswered.
    /// </summary>
    public void RecalculateAnsweredFlags()
    {
        foreach (var q in Questions)
        {
            if (q.Type == QuestionType.OpenAnswer)
            {
                q.IsAnswered = _textAnswers.TryGetValue(q.Id, out var texts)
                    && texts != null
                    && texts.Any(t => !string.IsNullOrWhiteSpace(t));
            }
            else
            {
                q.IsAnswered = _answers.TryGetValue(q.Id, out var answer)
                    && answer != null
                    && answer.Any(id => id > 0);
            }
        }
    }

    public void ResetTest()
    {
        _answers.Clear();
        _textAnswers.Clear();
        _leftItemsMap.Clear();
        _questions.Clear();
        Questions.Clear();
        CurrentIndex = 0;
        TimeLeft = 0;
        IsCompleted = false;
        _timer?.Stop();
    }

    /// <summary>
    /// Выводит текущие сохраненные опции вопроса.
    /// </summary>
    public void DebugPrintAnswer(int questionId)
    {
        var answer = GetAnswer(questionId);
        System.Diagnostics.Debug.WriteLine($"🔍 GetAnswer для вопроса {questionId}: [{string.Join(",", answer)}]");
    }
}