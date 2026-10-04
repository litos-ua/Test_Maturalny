using TestMaturalnyMobApp.ViewModels;

namespace TestMaturalnyMobApp.Views;

public partial class SubjectsPage : ContentPage
{
    public SubjectsPage()
    {
        InitializeComponent();
        BindingContext = new SubjectsViewModel();
    }

    private async void OnOptionalSelected(object sender, SelectionChangedEventArgs e)
    {
        if (e.CurrentSelection.FirstOrDefault() is SubjectDto subject)
        {
            await Application.Current.MainPage.DisplayAlert("Вибір дисципліни", $"Ви обрали: {subject.Name}", "OK");
        }
    }
}

