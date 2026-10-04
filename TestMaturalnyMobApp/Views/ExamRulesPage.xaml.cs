using TestMaturalnyMobApp.ViewModels;

namespace TestMaturalnyMobApp.Views;

public partial class ExamRulesPage : ContentPage
{
    public ExamRulesPage()
    {
        InitializeComponent();
        BindingContext = new ExamRulesViewModel();
    }
}

