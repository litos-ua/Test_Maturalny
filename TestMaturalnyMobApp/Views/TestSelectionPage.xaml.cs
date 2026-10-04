using TestMaturalnyMobApp.ViewModels;

namespace TestMaturalnyMobApp.Views;

public partial class TestSelectionPage : ContentPage
{
    private TestSelectionViewModel _viewModel;

    public TestSelectionPage(TestSelectionViewModel viewModel)
    {
        InitializeComponent();
        _viewModel = viewModel;
        BindingContext = _viewModel;
    }

    private void OnDisciplineSelected(object sender, SelectionChangedEventArgs e)
    {
        if (e.CurrentSelection.FirstOrDefault() is Models.DisciplineDto discipline)
        {
            // ✅ ПЕРЕХОД НА СТРАНИЦУ ТЕСТА С ПАРАМЕТРАМИ
            var query = new Dictionary<string, object>
            {
                ["disciplineId"] = discipline.Id,
                ["name"] = discipline.Name
            };

            Shell.Current.GoToAsync($"TestSessionPage", query);
        }
        // Сбрасываем выбор
        if (sender is CollectionView collectionView)
        {
            collectionView.SelectedItem = null;
        }
    }
}

