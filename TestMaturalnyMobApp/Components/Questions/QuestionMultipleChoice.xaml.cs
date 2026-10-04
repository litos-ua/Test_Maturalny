//using System.Collections.ObjectModel;
//using TestMaturalnyMobApp.Models;

//namespace TestMaturalnyMobApp.Components.Questions;

//public partial class QuestionMultipleChoice : QuestionBase
//{
//    public ObservableCollection<AnswerOption> Options { get; } = new();
//    private bool _isRestoring = false;  // ✅ Флаг восстановления

//    public QuestionMultipleChoice()
//    {
//        InitializeComponent();
//        System.Diagnostics.Debug.WriteLine($"🟢 QuestionMultipleChoice CONSTRUCTOR, IsGlobalRestoring = {IsGlobalRestoring}");
//    }

//    public override void OnQuestionChanged()
//    {
//        _isRestoring = true;  // ✅ Начинаем восстановление

//        try
//        {
//            System.Diagnostics.Debug.WriteLine($"========== QuestionMultipleChoice.OnQuestionChanged ==========");
//            System.Diagnostics.Debug.WriteLine($"   Question = {Question?.Id}");
//            System.Diagnostics.Debug.WriteLine($"   SavedAnswer: {(SavedAnswer != null ? $"[{string.Join(",", SavedAnswer)}]" : "null")}");
//            System.Diagnostics.Debug.WriteLine($"   SavedAnswer Count: {SavedAnswer?.Count ?? 0}");
//            System.Diagnostics.Debug.WriteLine($"   Options.Count = {Question?.Options?.Count ?? 0}");

//            Options.Clear();

//            if (Question?.Options == null || Question.Options.Count == 0)
//            {
//                System.Diagnostics.Debug.WriteLine("❌ Нет опций для добавления");
//                return;
//            }

//            foreach (var opt in Question.Options)
//            {
//                var isSelected = SavedAnswer?.Contains(opt.Id) ?? false;
//                opt.IsSelected = isSelected;
//                Options.Add(opt);
//                System.Diagnostics.Debug.WriteLine($"   Option: Id={opt.Id}, IsSelected={isSelected}");
//            }

//            System.Diagnostics.Debug.WriteLine($"✅ Добавлено {Options.Count} опций");
//            System.Diagnostics.Debug.WriteLine($"========== END QuestionMultipleChoice.OnQuestionChanged ==========");
//        }
//        catch (Exception ex)
//        {
//            System.Diagnostics.Debug.WriteLine($"❌ Ошибка в OnQuestionChanged: {ex.Message}");
//            System.Diagnostics.Debug.WriteLine($"   StackTrace: {ex.StackTrace}");
//        }
//        finally
//        {
//            _isRestoring = false;  // ✅ Конец восстановления
//        }
//    }

//    private void OnOptionChecked(object sender, CheckedChangedEventArgs e)
//    {
//        // ✅ Проверяем глобальный флаг восстановления
//        if (IsGlobalRestoring)
//        {
//            System.Diagnostics.Debug.WriteLine($"⏭️ Пропускаем событие CheckBox (глобальное восстановление)");
//            return;
//        }

//        try
//        {
//            if (sender is CheckBox checkBox && checkBox.BindingContext is AnswerOption option)
//            {
//                option.IsSelected = e.Value;
//                var selectedIds = Options.Where(o => o.IsSelected).Select(o => o.Id).ToList();
//                AnswerCommand?.Execute(new object[] { Question?.Id, selectedIds });
//            }
//        }
//        catch (Exception ex)
//        {
//            System.Diagnostics.Debug.WriteLine($"❌ Ошибка: {ex.Message}");
//        }
//    }
//}

using System.Collections.ObjectModel;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Components.Questions;

public partial class QuestionMultipleChoice : QuestionBase
{
    public ObservableCollection<AnswerOption> Options { get; } = new();

    public QuestionMultipleChoice()
    {
        InitializeComponent();
    }

    public override void OnQuestionChanged()
    {
        try
        {
            Options.Clear();

            if (Question?.Options == null || Question.Options.Count == 0)
                return;

            foreach (var opt in Question.Options)
            {
                opt.IsSelected = SavedAnswer?.Contains(opt.Id) ?? false;
                Options.Add(opt);
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ QuestionMultipleChoice.OnQuestionChanged Error: {ex.Message}");
        }
    }

    private void OnOptionChecked(object sender, CheckedChangedEventArgs e)
    {
        // ✅ Проверяем глобальный флаг восстановления
        if (IsGlobalRestoring)
            return;

        try
        {
            if (sender is CheckBox checkBox && checkBox.BindingContext is AnswerOption option)
            {
                option.IsSelected = e.Value;
                var selectedIds = Options.Where(o => o.IsSelected).Select(o => o.Id).ToList();
                AnswerCommand?.Execute(new object[] { Question?.Id, selectedIds });
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"❌ QuestionMultipleChoice.OnOptionChecked Error: {ex.Message}");
        }
    }
}