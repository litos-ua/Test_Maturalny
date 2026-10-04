using FluentValidation;
using TestMaturalnyMobApp.Models.DTOs.Auth;

namespace TestMaturalnyMobApp.Helpers.Validators;

public class LoginValidator : AbstractValidator<LoginRequestDto>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обов'язковий")
            .EmailAddress().WithMessage("Невірний формат email")
            .MaximumLength(100).WithMessage("Email не може перевищувати 100 символів");

        RuleFor(x => x.PasswordHash)
            .NotEmpty().WithMessage("Пароль обов'язковий")
            .MinimumLength(8).WithMessage("Пароль має містити щонайменше 8 символів");
    }
}
