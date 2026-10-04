

//// Диагностика для MultyChoice:
//using System.Globalization;
//using System.Windows.Input;
//using TestMaturalnyMobApp.Components.Questions;
//using TestMaturalnyMobApp.Models;

//namespace TestMaturalnyMobApp.Converters;

//public class QuestionToViewConverter : IValueConverter
//{
//    // ✅ Добавляем статическое поле для хранения AnswerCommand
//    public static ICommand? GlobalAnswerCommand { get; set; }
//    public static Func<int, List<int>>? GlobalGetAnswer { get; set; }

//    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
//    {

//        if (value is Question question)
//        {
//            System.Diagnostics.Debug.WriteLine($"✅ Question получен: Id={question.Id}, Type={question.Type}");

//            // ✅ ВКЛЮЧАЕМ ГЛОБАЛЬНЫЙ РЕЖИМ ВОССТАНОВЛЕНИЯ ДО СОЗДАНИЯ КОМПОНЕНТА!
//            QuestionBase.IsGlobalRestoring = true;
//            System.Diagnostics.Debug.WriteLine($"   ✅ IsGlobalRestoring = true (ДО создания компонента)");

//            try
//            {
//                // Создаем компонент в зависимости от типа
//                QuestionBase result;
//                switch (question.Type)
//                {
//                    case QuestionType.SingleChoice:
//                        result = new QuestionSingleChoice { Question = question };
//                        break;
//                    case QuestionType.MultipleChoice:
//                        result = new QuestionMultipleChoice { Question = question };
//                        break;
//                    case QuestionType.DoubleChoice:
//                        result = new QuestionDoubleChoice { Question = question };
//                        break;
//                    case QuestionType.Matching:
//                        result = new QuestionMatching { Question = question };
//                        break;
//                    case QuestionType.CorrectSequence:
//                        result = new QuestionCorrectSequence { Question = question };
//                        break;
//                    default:
//                        result = new QuestionSingleChoice { Question = question };
//                        break;
//                }

//                System.Diagnostics.Debug.WriteLine($"   ✅ Компонент создан, IsGlobalRestoring = {QuestionBase.IsGlobalRestoring}");

//                // ✅ Передаем AnswerCommand
//                if (GlobalAnswerCommand != null)
//                {
//                    result.AnswerCommand = GlobalAnswerCommand;
//                    System.Diagnostics.Debug.WriteLine($"   ✅ AnswerCommand установлен");
//                }

//                // ✅ Передаем SavedAnswer
//                if (GlobalGetAnswer != null)
//                {
//                    var savedAnswer = GlobalGetAnswer(question.Id);
//                    result.SavedAnswer = savedAnswer ?? new List<int>();
//                    System.Diagnostics.Debug.WriteLine($"   ✅ SavedAnswer установлен: [{string.Join(",", result.SavedAnswer)}]");
//                }

//                // ✅ Принудительно вызываем OnQuestionChanged для восстановления
//                result.OnQuestionChanged();
//                System.Diagnostics.Debug.WriteLine($"   ✅ OnQuestionChanged вызван");

//                return result;
//            }
//            finally
//            {
//                // ✅ Выключаем глобальный режим восстановления ПОСЛЕ создания компонента
//                QuestionBase.IsGlobalRestoring = false;
//                System.Diagnostics.Debug.WriteLine($"   ✅ IsGlobalRestoring = false");
//            }
//        }

//        return new ContentView();
//    }

//    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
//    {
//        throw new NotImplementedException();
//    }
//}


// ✅ Добавлены два статических поля для OpenAnswer и соответствующие блоки case для OpenAnswer

using System.Globalization;
using System.Windows.Input;
using TestMaturalnyMobApp.Components.Questions;
using TestMaturalnyMobApp.Models;

namespace TestMaturalnyMobApp.Converters;

public class QuestionToViewConverter : IValueConverter
{
    // ✅ Добавляем статическое поле для хранения AnswerCommand
    public static ICommand? GlobalAnswerCommand { get; set; }
    public static Func<int, List<int>>? GlobalGetAnswer { get; set; }

    // ✅ Добавляем статические поля для OpenAnswer (текстовые ответы)
    public static ICommand? GlobalTextAnswerCommand { get; set; }
    public static Func<int, List<string>>? GlobalGetTextAnswer { get; set; }

    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {

        if (value is Question question)
        {
            System.Diagnostics.Debug.WriteLine($"✅ Question получен: Id={question.Id}, Type={question.Type}");

            // ✅ ВКЛЮЧАЕМ ГЛОБАЛЬНЫЙ РЕЖИМ ВОССТАНОВЛЕНИЯ ДО СОЗДАНИЯ КОМПОНЕНТА!
            QuestionBase.IsGlobalRestoring = true;
            System.Diagnostics.Debug.WriteLine($"   ✅ IsGlobalRestoring = true (ДО создания компонента)");

            try
            {
                // Создаем компонент в зависимости от типа
                QuestionBase result;
                switch (question.Type)
                {
                    case QuestionType.SingleChoice:
                        result = new QuestionSingleChoice { Question = question };
                        break;
                    case QuestionType.MultipleChoice:
                        result = new QuestionMultipleChoice { Question = question };
                        break;
                    case QuestionType.DoubleChoice:
                        result = new QuestionDoubleChoice { Question = question };
                        break;
                    case QuestionType.Matching:
                        result = new QuestionMatching { Question = question };
                        break;
                    case QuestionType.CorrectSequence:
                        result = new QuestionCorrectSequence { Question = question };
                        break;
                    case QuestionType.OpenAnswer:
                        result = new QuestionOpenAnswer { Question = question };
                        break;
                    default:
                        result = new QuestionSingleChoice { Question = question };
                        break;
                }

                System.Diagnostics.Debug.WriteLine($"   ✅ Компонент создан, IsGlobalRestoring = {QuestionBase.IsGlobalRestoring}");

                // ✅ Передаем AnswerCommand
                if (GlobalAnswerCommand != null)
                {
                    result.AnswerCommand = GlobalAnswerCommand;
                    System.Diagnostics.Debug.WriteLine($"   ✅ AnswerCommand установлен");
                }

                // ✅ Передаем SavedAnswer
                if (GlobalGetAnswer != null)
                {
                    var savedAnswer = GlobalGetAnswer(question.Id);
                    result.SavedAnswer = savedAnswer ?? new List<int>();
                    System.Diagnostics.Debug.WriteLine($"   ✅ SavedAnswer установлен: [{string.Join(",", result.SavedAnswer)}]");
                }

                // ✅ Передаем TextAnswerCommand (для OpenAnswer)
                if (GlobalTextAnswerCommand != null)
                {
                    result.TextAnswerCommand = GlobalTextAnswerCommand;
                    System.Diagnostics.Debug.WriteLine($"   ✅ TextAnswerCommand установлен");
                }

                // ✅ Передаем SavedTextAnswer (для OpenAnswer)
                if (GlobalGetTextAnswer != null)
                {
                    var savedTextAnswer = GlobalGetTextAnswer(question.Id);
                    result.SavedTextAnswer = savedTextAnswer ?? new List<string>();
                    System.Diagnostics.Debug.WriteLine($"   ✅ SavedTextAnswer установлен: [{string.Join(",", result.SavedTextAnswer)}]");
                }

                // ✅ Принудительно вызываем OnQuestionChanged для восстановления
                result.OnQuestionChanged();
                System.Diagnostics.Debug.WriteLine($"   ✅ OnQuestionChanged вызван");

                return result;
            }
            finally
            {
                // ✅ Выключаем глобальный режим восстановления ПОСЛЕ создания компонента
                QuestionBase.IsGlobalRestoring = false;
                System.Diagnostics.Debug.WriteLine($"   ✅ IsGlobalRestoring = false");
            }
        }

        return new ContentView();
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}