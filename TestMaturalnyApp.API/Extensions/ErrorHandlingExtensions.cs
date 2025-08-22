using System.Text.Json;
using TestMaturalnyApp.API.Middleware;

namespace TestMaturalnyApp.API.Extensions
{
    public static class ErrorHandlingExtensions
    {
        public static IApplicationBuilder UseGlobalErrorHandling(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePages(async context =>
            {
                var response = context.HttpContext.Response;

                // Пропускаем успешные статусы
                if (response.StatusCode < 400) return;

                response.ContentType = "application/json";

                var errorDetails = new
                {
                    StatusCode = response.StatusCode,
                    Message = response.StatusCode switch
                    {
                        400 => "Bad Request",
                        401 => "Unauthorized",
                        403 => "Forbidden",
                        404 => "Not Found",
                        405 => "Method Not Allowed",
                        406 => "Not Acceptable",
                        408 => "Request Timeout",
                        409 => "Conflict",
                        411 => "Length Required",
                        412 => "Precondition Failed",
                        413 => "Payload Too Large",
                        414 => "URI Too Long",
                        416 => "Range Not Satisfiable",
                        417 => "Expectation Failed",
                        422 => "Unprocessable Content",
                        423 => "Locked",
                        429 => "Too Many Requests",
                        431 => "Request Header Fields Too Large",
                        500 => "Internal Server Error",
                        501 => "Not Implemented",
                        502 => "Bad Gateway",
                        503 => "Service Unavailable",
                        504 => "Gateway Timeout",
                        505 => "HTTP Version Not Supported",
                        506 => "Variant Also Negotiates",
                        507 => "Insufficient Storage",
                        508 => "Loop Detected",
                        510 => "Not Extended",
                        511 => "Network Authentication Required",
                        _ => "Unexpected error"
                    },
                    ErrorCode = $"ERR{response.StatusCode}"
                };

                var json = JsonSerializer.Serialize(errorDetails);
                await response.WriteAsync(json);
            });

            return app;
        }
    }
}
