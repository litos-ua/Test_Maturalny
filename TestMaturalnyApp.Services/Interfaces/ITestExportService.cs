
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface ITestExportService
    {
        Task<TestExportDto> ExportSessionAsync(int sessionId);
    }
}
