using FluentValidation;

namespace TestMaturalnyMobApp.Helpers.Validators;

public class ResetPasswordValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Токен обов'язковий");

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("Новий пароль обов'язковий")
            .MinimumLength(8).WithMessage("Пароль має містити щонайменше 8 символів")
            .MaximumLength(100).WithMessage("Пароль не може перевищувати 100 символів")
            .Matches(@"[A-Z]").WithMessage("Пароль має містити хоча б одну велику літеру")
            .Matches(@"[a-z]").WithMessage("Пароль має містити хоча б одну малу літеру")
            .Matches(@"[0-9]").WithMessage("Пароль має містити хоча б одну цифру")
            .Matches("[!@#$%^&*(),.?\":{}|<>]").WithMessage("Пароль має містити хоча б один спеціальний символ");

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty().WithMessage("Підтвердження пароля обов'язкове")
            .Equal(x => x.NewPassword).WithMessage("Паролі не співпадають");
    }
}

public class ResetPasswordRequest
{
    public string Token { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}
