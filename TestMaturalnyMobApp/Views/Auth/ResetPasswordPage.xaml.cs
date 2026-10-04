using TestMaturalnyMobApp.ViewModels.Auth;

namespace TestMaturalnyMobApp.Views.Auth;

public partial class ResetPasswordPage : ContentPage
{
    public ResetPasswordPage(ResetPasswordViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}
