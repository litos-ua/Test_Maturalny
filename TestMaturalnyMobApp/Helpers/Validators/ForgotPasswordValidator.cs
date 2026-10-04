using FluentValidation;

namespace TestMaturalnyMobApp.Helpers.Validators;

public class ForgotPasswordValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обов'язковий")
            .EmailAddress().WithMessage("Невірний формат email")
            .MaximumLength(100).WithMessage("Email не може перевищувати 100 символів");
    }
}

public class ForgotPasswordRequest
{
    public string Email { get; set; } = string.Empty;
}
