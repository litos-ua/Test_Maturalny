
using TestMaturalnyApp.Domain.Entities.DTOs;

namespace TestMaturalnyApp.Services.Interfaces
{
    public interface ITestEvaluationService
    {
        Task<TestEvaluationResultDto> EvaluateAsync(EvaluateTestRequestDto request);
        Task<TestEvaluationResultDto> EvaluateShuffleAsync(EvaluateTestRequestDto request);
    }

}
