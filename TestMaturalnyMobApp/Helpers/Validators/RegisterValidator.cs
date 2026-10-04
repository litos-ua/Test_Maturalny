using FluentValidation;
using TestMaturalnyMobApp.Models.DTOs.Auth;

namespace TestMaturalnyMobApp.Helpers.Validators;

public class RegisterValidator : AbstractValidator<RegisterUserDto>
{
    public RegisterValidator()
    {
        // Username
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Логін обов'язковий")
            .MaximumLength(50).WithMessage("Логін не може перевищувати 50 символів")
            .Matches(@"^[a-zA-Z0-9_\-]+$").WithMessage("Логін може містити тільки букви, цифри, підкреслення та дефіс");

        // Email
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обов'язковий")
            .EmailAddress().WithMessage("Невірний формат email")
            .MaximumLength(100).WithMessage("Email не може перевищувати 100 символів");

        // Password
        RuleFor(x => x.PasswordHash)
            .NotEmpty().WithMessage("Пароль обов'язковий")
            .MinimumLength(8).WithMessage("Пароль має містити щонайменше 8 символів")
            .MaximumLength(100).WithMessage("Пароль не може перевищувати 100 символів")
            .Matches(@"[A-Z]").WithMessage("Пароль має містити хоча б одну велику літеру")
            .Matches(@"[a-z]").WithMessage("Пароль має містити хоча б одну малу літеру")
            .Matches(@"[0-9]").WithMessage("Пароль має містити хоча б одну цифру")
            .Matches("[!@#$%^&*(),.?\":{}|<>]").WithMessage("Пароль має містити хоча б один спеціальний символ");

        // Fullname (необов'язково)
        RuleFor(x => x.Fullname)
            .MaximumLength(100).WithMessage("Повне ім'я не може перевищувати 100 символів")
            .When(x => !string.IsNullOrEmpty(x.Fullname));

        // Address (необов'язково)
        RuleFor(x => x.Address)
            .MaximumLength(200).WithMessage("Адреса не може перевищувати 200 символів")
            .When(x => !string.IsNullOrEmpty(x.Address));

        // PhoneNumber (необов'язково)
        RuleFor(x => x.PhoneNumber)
            .MaximumLength(20).WithMessage("Телефон не може перевищувати 20 символів")
            .Matches(@"^\+?[0-9\s\-\(\)]+$").WithMessage("Невірний формат телефону")
            .When(x => !string.IsNullOrEmpty(x.PhoneNumber));
    }
}
