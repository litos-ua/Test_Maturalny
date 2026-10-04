using TestMaturalnyMobApp.ViewModels.Auth;

namespace TestMaturalnyMobApp.Views.Auth;

public partial class LoginPage : ContentPage
{
    public LoginPage(LoginViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}
