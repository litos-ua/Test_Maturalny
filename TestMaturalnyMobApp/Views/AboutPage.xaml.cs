
using TestMaturalnyMobApp.ViewModels;

namespace TestMaturalnyMobApp.Views;

public partial class AboutPage : ContentPage
{
    public AboutPage()
    {
        InitializeComponent();
        //System.Diagnostics.Debug.WriteLine("=== AboutPage CONSTRUCTOR ===");
        // ✅ Устанавливаем ViewModel и показываем кнопку "Назад"
        var vm = new HomePageViewModel();
        vm.IsBackVisible = true; // Показываем кнопку "Назад"
        BindingContext = vm;
    }

    private async void OnNavigateBack(object sender, EventArgs e)
    {
        // ✅ Используем Shell навигацию
        //await Shell.Current.GoToAsync("..");
        //await Shell.Current.GoToAsync("AboutPage");
        await Shell.Current.GoToAsync("//HomePage");
    }
}