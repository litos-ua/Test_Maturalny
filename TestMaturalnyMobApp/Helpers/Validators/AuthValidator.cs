using FluentValidation.Results;

namespace TestMaturalnyMobApp.Helpers.Validators;

public static class AuthValidator
{
    public static bool IsValidEmail(string email)
    {
        if (string.IsNullOrEmpty(email))
            return false;

        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    public static bool IsValidPassword(string password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 8)
            return false;

        return true;
    }

    public static string GetValidationErrorsString(ValidationResult result)
    {
        return string.Join("\n", result.Errors.Select(e => e.ErrorMessage));
    }
}
