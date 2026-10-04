using TestMaturalnyMobApp.ViewModels.Auth;

namespace TestMaturalnyMobApp.Views.Auth;

public partial class RegisterPage : ContentPage
{
    public RegisterPage(RegisterViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}
