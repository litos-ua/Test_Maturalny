using System.Windows.Input;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public abstract class QuestionBase : ContentView
{
    public static readonly BindableProperty QuestionProperty =
        BindableProperty.Create(nameof(Question), typeof(Question), typeof(QuestionBase),
            propertyChanged: OnQuestionChanged);

    public static readonly BindableProperty SavedAnswerProperty =
        BindableProperty.Create(nameof(SavedAnswer), typeof(List<int>), typeof(QuestionBase),
            defaultValue: new List<int>());

    public static readonly BindableProperty AnswerCommandProperty =
        BindableProperty.Create(nameof(AnswerCommand), typeof(ICommand), typeof(QuestionBase));

    public static readonly BindableProperty SavedTextAnswerProperty =  // расширение под текстовые ответы для OpenAnswer                     
    BindableProperty.Create(nameof(SavedTextAnswer), typeof(List<string>), typeof(QuestionBase),
        defaultValue: null);

    public static readonly BindableProperty TextAnswerCommandProperty =  // расширение под текстовые ответы для OpenAnswer 
        BindableProperty.Create(nameof(TextAnswerCommand), typeof(ICommand), typeof(QuestionBase));

    public Question Question
    {
        get => (Question)GetValue(QuestionProperty);
        set => SetValue(QuestionProperty, value);
    }

    public List<int> SavedAnswer
    {
        get => (List<int>)GetValue(SavedAnswerProperty);
        set => SetValue(SavedAnswerProperty, value);
    }

    public ICommand AnswerCommand
    {
        get => (ICommand)GetValue(AnswerCommandProperty);
        set => SetValue(AnswerCommandProperty, value);
    }

    public List<string> SavedTextAnswer           // расширение под текстовые ответы для OpenAnswer 
    {
        get => (List<string>)GetValue(SavedTextAnswerProperty);
        set => SetValue(SavedTextAnswerProperty, value);
    }

    public ICommand TextAnswerCommand             // расширение под текстовые ответы для OpenAnswer 
    {
        get => (ICommand)GetValue(TextAnswerCommandProperty);
        set => SetValue(TextAnswerCommandProperty, value);
    }
    public virtual void OnQuestionChanged()
    {
        // Для переопределения в наследниках
    }

    public static bool IsGlobalRestoring { get; set; } = false;

    private static void OnQuestionChanged(BindableObject bindable, object oldValue, object newValue)
    {
        if (bindable is QuestionBase control)
        {
            control.OnQuestionChanged();
        }
    }
}
