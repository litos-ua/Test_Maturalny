using Microsoft.Extensions.Logging;

namespace TestMaturalnyApp.Infrastructure.Logging
{
    public class FileLoggerProvider : ILoggerProvider
    {
        private readonly string _path;

        public FileLoggerProvider(string path) => _path = path;

        public ILogger CreateLogger(string categoryName) => new FileLogger(_path);

        public void Dispose() { }
    }

    public class FileLogger : ILogger
    {
        private readonly string _path;

        public FileLogger(string path) => _path = path;

        public IDisposable BeginScope<TState>(TState state) => NullScope.Instance;

        public bool IsEnabled(LogLevel logLevel) => true; 


        public void Log<TState>(
            LogLevel logLevel,
            EventId eventId,
            TState state,
            Exception? exception,
            Func<TState, Exception?, string> formatter)
        {
            if (formatter == null) return;

            if (!IsEnabled(logLevel)) return;

            try
            {
                var message = $"{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} [{logLevel}] {formatter(state, exception)}";
                if (exception != null)
                {
                    message += Environment.NewLine + exception;
                }

                File.AppendAllText(_path, message + Environment.NewLine);
            }
            catch
            {
                Console.WriteLine($"[LoggerError] {DateTime.UtcNow}: {exception.Message}");
            }
        }

        // Пустой скоуп, чтобы не возвращать null
        private class NullScope : IDisposable
        {
            public static NullScope Instance { get; } = new NullScope();
            public void Dispose() { }
        }
    }

}
