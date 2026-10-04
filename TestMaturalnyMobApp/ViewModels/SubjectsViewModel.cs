using System.Collections.ObjectModel;
using System.Windows.Input;


namespace TestMaturalnyMobApp.ViewModels;

public class SubjectsViewModel : BaseViewModel
{
    public ObservableCollection<SubjectDto> MandatorySubjects { get; }
    public ObservableCollection<SubjectDto> OptionalSubjects { get; }

    private bool _isDarkTheme;
    public ICommand ToggleThemeCommand { get; }

    public SubjectsViewModel()
    {
        MandatorySubjects = new ObservableCollection<SubjectDto>
        {
            new SubjectDto("Українська мова", "Обов'язковий предмет для всіх учасників НМТ."),
            new SubjectDto("Математика", "Базовий предмет, що перевіряє логіку та аналітичні здібності."),
            new SubjectDto("Історія України", "Перевірка знань ключових подій та процесів історії України.")
        };

        OptionalSubjects = new ObservableCollection<SubjectDto>
        {
            new SubjectDto("Фізика", "Вибір для тих, хто планує технічні спеціальності."),
            new SubjectDto("Хімія", "Корисно для майбутніх медичних та біологічних напрямів."),
            new SubjectDto("Біологія", "Необхідно для медицини, біотехнологій."),
            new SubjectDto("Географія", "Актуально для економічних та географічних спеціальностей."),
            new SubjectDto("Англійська мова", "Важливо для міжнародних програм та гуманітарних спеціальностей.")
        };
        _isDarkTheme = Application.Current?.UserAppTheme == AppTheme.Dark;
        ToggleThemeCommand = new Command(OnToggleTheme);
    }

    private void OnToggleTheme()
    {
        _isDarkTheme = !_isDarkTheme;
        Application.Current.UserAppTheme = _isDarkTheme ? AppTheme.Dark : AppTheme.Light;
    }

}

public record SubjectDto(string Name, string Description);

