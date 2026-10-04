using Microsoft.Maui.Controls;

namespace TestMaturalnyMobApp.Components;

public partial class FooterView : ContentView
{
    public FooterView()
    {
        InitializeComponent();
    }

    private async void OnGoHome(object sender, EventArgs e)
    {
        // ✅ Абсолютный путь с ///
        await Shell.Current.GoToAsync("///HomePage", animate: false);
    }

    private async void OnGoTest(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("///TestSelectionPage", animate: false);
    }

    private async void OnGoAbout(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("///AboutPage", animate: false);
    }

    private async void OnGoContacts(object sender, EventArgs e)
    {
        await Application.Current.MainPage.DisplayAlert("Инфо", "Страница 'Контакты' в разработке", "OK");
    }
}