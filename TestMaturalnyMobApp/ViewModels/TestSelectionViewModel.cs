//using System.Collections.ObjectModel;
//using System.Windows.Input;
//using TestMaturalnyMobApp.Services;

//namespace TestMaturalnyMobApp.ViewModels;

//public class TestSelectionViewModel : BaseViewModel
//{
//    private readonly DisciplineService _disciplineService;
//    private bool _isLoading;
//    private bool _isEmpty;

//    public ObservableCollection<DisciplineItem> Disciplines { get; } = new();

//    public bool IsLoading
//    {
//        get => _isLoading;
//        set { _isLoading = value; OnPropertyChanged(); }
//    }

//    public bool IsEmpty
//    {
//        get => _isEmpty;
//        set { _isEmpty = value; OnPropertyChanged(); }
//    }

//    public ICommand SelectDisciplineCommand { get; }

//    public TestSelectionViewModel(DisciplineService disciplineService)
//    {
//        _disciplineService = disciplineService;
//        SelectDisciplineCommand = new Command<int>(OnDisciplineSelected);

//        LoadDisciplines();
//    }

//    private async void LoadDisciplines()
//    {
//        try
//        {
//            IsLoading = true;
//            IsEmpty = false;
//            Disciplines.Clear();

//            var disciplines = await _disciplineService.GetDisciplines();

//            if (disciplines != null && disciplines.Any())
//            {
//                int index = 0;
//                foreach (var d in disciplines)
//                {
//                    Disciplines.Add(new DisciplineItem
//                    {
//                        Id = d.Id,
//                        Name = d.Name,
//                        Index = index,
//                        SelectCommand = SelectDisciplineCommand
//                    });
//                    index++;
//                }
//            }
//            else
//            {
//                IsEmpty = true;
//            }
//        }
//        catch (Exception ex)
//        {
//            IsEmpty = true;
//            await Application.Current.MainPage.DisplayAlert("Ошибка", $"Не удалось загрузить дисциплины: {ex.Message}", "OK");
//        }
//        finally
//        {
//            IsLoading = false;
//        }
//    }

//    // Для отладки ✅ ПЕРЕХОД НА СТРАНИЦУ ТЕСТА
//    private async void OnDisciplineSelected(int disciplineId)
//    {

//        var discipline = Disciplines.FirstOrDefault(d => d.Id == disciplineId);

//        // 🔍 ОТЛАДКА: найдена ли дисциплина
//        if (discipline == null)
//        {
//            System.Diagnostics.Debug.WriteLine($"❌ Дисциплина с Id={disciplineId} НЕ НАЙДЕНА!");
//            return;
//        }

//        System.Diagnostics.Debug.WriteLine($"✅ Найдена дисциплина: {discipline.Id} - {discipline.Name}");

//        // ✅ Передаем параметры на страницу теста
//        var query = new Dictionary<string, object>
//        {
//            ["disciplineId"] = discipline.Id.ToString(),
//            ["name"] = discipline.Name
//        };

//        System.Diagnostics.Debug.WriteLine($"📤 Отправка: disciplineId={discipline.Id}, name={discipline.Name}");

//        await Shell.Current.GoToAsync("TestSessionPage", query);
//    }

//}



//// ✅ ВСПОМОГАТЕЛЬНЫЙ КЛАСС ДЛЯ ЭЛЕМЕНТА
//public class DisciplineItem
//{
//    public int Id { get; set; }
//    public string Name { get; set; } = string.Empty;
//    public int Index { get; set; }
//    public ICommand? SelectCommand { get; set; }

//    // 🔍 ДЛЯ ОТЛАДКИ
//    public override string ToString()
//    {
//        return $"{Id}: {Name}";
//    }
//}


using System.Collections.ObjectModel;
using System.Windows.Input;
using TestMaturalnyMobApp.Services;

namespace TestMaturalnyMobApp.ViewModels;

public class TestSelectionViewModel : BaseViewModel
{
    private readonly DisciplineService _disciplineService;
    private bool _isLoading;
    private bool _isEmpty;

    public ObservableCollection<DisciplineItem> Disciplines { get; } = new();

    public bool IsLoading
    {
        get => _isLoading;
        set { _isLoading = value; OnPropertyChanged(); }
    }

    public bool IsEmpty
    {
        get => _isEmpty;
        set { _isEmpty = value; OnPropertyChanged(); }
    }

    public ICommand SelectDisciplineCommand { get; }

    public TestSelectionViewModel(DisciplineService disciplineService)
    {
        _disciplineService = disciplineService;
        SelectDisciplineCommand = new Command<int>(OnDisciplineSelected);

        LoadDisciplines();
    }

    private async void LoadDisciplines()
    {
        try
        {
            IsLoading = true;
            IsEmpty = false;
            Disciplines.Clear();

            var disciplines = await _disciplineService.GetDisciplines();

            if (disciplines != null && disciplines.Any())
            {
                int index = 0;
                foreach (var d in disciplines)
                {
                    Disciplines.Add(new DisciplineItem
                    {
                        Id = d.Id,
                        Name = d.Name,
                        Index = index,
                        SelectCommand = SelectDisciplineCommand
                    });
                    index++;
                }
            }
            else
            {
                IsEmpty = true;
            }
        }
        catch (Exception ex)
        {
            IsEmpty = true;
            await Application.Current.MainPage.DisplayAlert("Ошибка", $"Не удалось загрузить дисциплины: {ex.Message}", "OK");
        }
        finally
        {
            IsLoading = false;
        }
    }

    private async void OnDisciplineSelected(int disciplineId)
    {
        var discipline = Disciplines.FirstOrDefault(d => d.Id == disciplineId);
        if (discipline == null) return;

        var query = new Dictionary<string, object>
        {
            ["disciplineId"] = discipline.Id.ToString(),
            ["name"] = discipline.Name
        };

        await Shell.Current.GoToAsync("TestSessionPage", query);
    }
}

public class DisciplineItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Index { get; set; }
    public ICommand? SelectCommand { get; set; }
}