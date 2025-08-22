
namespace TestMaturalnyApp.Domain.Entities.Enums
{
    public enum SessionEndReason
    {
        CompletedByUser,         // Пользователь сам завершил
        AbortedByUser,           // Пользователь отменил вручную
        Timeout,                 // Время вышло
        BrowserClosedOrCrashed   // Закрытие вкладки / сбой
    }
}
