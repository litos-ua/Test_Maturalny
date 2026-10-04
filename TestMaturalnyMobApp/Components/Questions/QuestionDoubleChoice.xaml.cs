using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public partial class QuestionDoubleChoice : QuestionBase
{
    private string _firstAnswer = "";
    private string _secondAnswer = "";

    public string FirstAnswer
    {
        get => _firstAnswer;
        set
        {
            if (_firstAnswer != value)
            {
                _firstAnswer = value;
                OnPropertyChanged();
                CheckAndSendAnswer();
            }
        }
    }

    public string SecondAnswer
    {
        get => _secondAnswer;
        set
        {
            if (_secondAnswer != value)
            {
                _secondAnswer = value;
                OnPropertyChanged();
                CheckAndSendAnswer();
            }
        }
    }

    public QuestionDoubleChoice()
    {
        InitializeComponent();
    }

    public override void OnQuestionChanged()
    {
        if (SavedAnswer?.Count == 2)
        {
            FirstAnswer = SavedAnswer[0].ToString();
            SecondAnswer = SavedAnswer[1].ToString();
        }
        else
        {
            FirstAnswer = "";
            SecondAnswer = "";
        }
    }

    private void CheckAndSendAnswer()
    {
        if (int.TryParse(FirstAnswer, out var first) && int.TryParse(SecondAnswer, out var second))
        {
            AnswerCommand?.Execute(new object[] { Question?.Id, new List<int> { first, second } });
        }
    }
}