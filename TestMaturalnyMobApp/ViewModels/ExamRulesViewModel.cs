using System.Collections.ObjectModel;
using System.Windows.Input;

namespace TestMaturalnyMobApp.ViewModels
{
    public class ExamRulesViewModel : BaseViewModel
    {
        private bool _isDarkTheme;
        public ObservableCollection<QuestionType> QuestionTypes { get; }
        public ICommand ShowDetailsCommand { get; }
        public ICommand ToggleThemeCommand { get; }

        public ExamRulesViewModel()
        {
            QuestionTypes = new ObservableCollection<QuestionType>
            {
                new QuestionType(
                    "SingleChoice",
                    "Простий вибір з опцій",
                    "Виберіть одну правильну відповідь із запропонованих варіантів.",
                    "Оцінювання:\n- За повністю правильну відповідь: +1 бал.\n- За неправильну або відсутність відповіді: 0 балів.\n- Часткового балу не передбачено."
                ),
                new QuestionType(
                    "DoubleChoice",
                    "Відповідь з подвійним значенням",
                    "Виберіть дві правильні відповіді із запропонованих.",
                    "Оцінювання:\n- +1 бал — якщо обидві відповіді вибрано правильно.\n- 0 балів — якщо хоча б одна відповідь неправильна або відсутня."
                ),
                new QuestionType(
                    "MultiChoice",
                    "Вибір кількох опцій",
                    "Виберіть кілька правильних відповідей (від 3 і більше).",
                    "Оцінювання:\n- За кожну правильну відповідь: +1 бал.\n- За кожну неправильну обрану відповідь: -1 бал.\n- Підсумкова кількість балів за питання не може бути меншою за 0."
                ),
                new QuestionType(
                    "CorrectSequence",
                    "Питання на послідовність",
                    "Розташуйте елементи у правильному порядку.",
                    "Оцінювання:\n- Максимум балів: кількість елементів – 1.\n- +1 бал за кожну пару сусідніх елементів, які розташовані правильно.\n- 0 балів, якщо жодна пара не збігається із правильною послідовністю."
                ),
                new QuestionType(
                    "Matching",
                    "Питання на зіставлення",
                    "З'єднайте елементи з двох колонок у правильні пари.",
                    "Оцінювання:\n- +1 бал за кожну правильно складену пару.\n- 0 балів за неправильні пари.\n- Підсумкова кількість балів – сума за всі правильні пари."
                )
            };

            _isDarkTheme = Application.Current?.UserAppTheme == AppTheme.Dark;

            ShowDetailsCommand = new Command<QuestionType>(async (q) =>
            {
                await Application.Current.MainPage.DisplayAlert(
                    $"{q.Title} — Правила оцінювання",
                    q.Details,
                    "Закрыть");
            });

            ToggleThemeCommand = new Command(OnToggleTheme);
        }

        private void OnToggleTheme()
        {
            _isDarkTheme = !_isDarkTheme;
            Application.Current.UserAppTheme = _isDarkTheme ? AppTheme.Dark : AppTheme.Light;
        }
    }

    public record QuestionType(string Type, string Title, string Short, string Details);
}

