
// Работает с ViewModel
using TestMaturalnyMobApp.ViewModels;

namespace TestMaturalnyMobApp.Views;

public partial class HomePage : ContentPage
{
    private HomePageViewModel _viewModel;

    public HomePage()
    {
        InitializeComponent();
        System.Diagnostics.Debug.WriteLine($"🟣 HomePage CONSTRUCTOR: {DateTime.Now:HH:mm:ss.fff}");

        // ✅ Устанавливаем ViewModel
        _viewModel = new HomePageViewModel();
        _viewModel.IsBackVisible = false; // Скрываем кнопку "Назад" на главной
        BindingContext = _viewModel;

        System.Diagnostics.Debug.WriteLine("=== HomePage CONSTRUCTOR with ViewModel ===");
    }
}