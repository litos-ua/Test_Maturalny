namespace TestMaturalnyApp.API.Extensions
{
    public class CustomValidationException : Exception
    {
        public IDictionary<string, string[]> ValidationErrors { get; }

        public CustomValidationException(IDictionary<string, string[]> validationErrors)
            : base("Validation error.")
        {
            ValidationErrors = validationErrors;
        }
    }
}
