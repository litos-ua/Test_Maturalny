


using System.ComponentModel;
using System.Runtime.CompilerServices;
using TestMaturalnyMobApp.Helpers;  

namespace TestMaturalnyMobApp.Models;

public enum QuestionType
{
    SingleChoice = 0,
    MultipleChoice = 1,
    Matching = 2,
    DoubleChoice = 3,
    CorrectSequence = 4,
    OpenAnswer = 5,
}

public class AnswerOption : INotifyPropertyChanged
{
    private bool _isSelected;

    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public string? GroupKey { get; set; }
    public string? MatchLabel { get; set; }
    public string? Explanation { get; set; }

    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            if (_isSelected != value)
            {
                _isSelected = value;
                OnPropertyChanged();
            }
        }
    }

    public bool IsImage => !string.IsNullOrEmpty(GroupKey) &&
                           (GroupKey.ToLower().StartsWith("img") ||
                            GroupKey.ToLower().StartsWith("image"));

    // ✅ Используем MathHelper из Helpers
    public bool IsFormula => !string.IsNullOrEmpty(Text) && MathHelper.IsMathExpression(Text);

    public event PropertyChangedEventHandler? PropertyChanged;
    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}

public class Question : INotifyPropertyChanged
{
    private bool _isAnswered;
    private bool _isCurrent;

    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public QuestionType Type { get; set; }
    public int MaxScore { get; set; }
    public int Difficulty { get; set; }
    public int TopicId { get; set; }
    public List<AnswerOption> Options { get; set; } = new();
    public int DisplayNumber { get; set; }

    public bool HasImage => !string.IsNullOrEmpty(ImageUrl);

    // ✅ Используем MathHelper из Helpers
    public bool IsFormula => !string.IsNullOrEmpty(Text) && MathHelper.IsMathExpression(Text);

    public bool IsAnswered
    {
        get => _isAnswered;
        set
        {
            if (_isAnswered != value)
            {
                _isAnswered = value;
                OnPropertyChanged();
            }
        }
    }

    public bool IsCurrent
    {
        get => _isCurrent;
        set
        {
            if (_isCurrent != value)
            {
                _isCurrent = value;
                OnPropertyChanged();
            }
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}