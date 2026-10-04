using TestMaturalnyMobApp.ViewModels.Auth;

namespace TestMaturalnyMobApp.Views.Auth;

public partial class ForgotPasswordPage : ContentPage
{
    public ForgotPasswordPage(ForgotPasswordViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}
