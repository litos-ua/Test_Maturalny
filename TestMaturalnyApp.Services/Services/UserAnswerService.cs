using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;
using TestMaturalnyApp.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data;
using System.Text.Json;

namespace TestMaturalnyApp.Services.Services
{
    public class UserAnswerService : IUserAnswerService
    {
        private readonly IUserAnswerRepository _repositoryUserAnswer;
        private readonly ICurrentUserService _currentUserService;

        public UserAnswerService(IUserAnswerRepository repository, ICurrentUserService currentUserService)
        {
            _repositoryUserAnswer = repository;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<UserAnswerDto>> GetBySessionIdAsync(int sessionId)
        {
            var data = await _repositoryUserAnswer.GetBySessionIdAsync(sessionId);
            return data.Select(ua =>
                UserAnswerDtoMapper.MapToDto(UserAnswerMapper.MapToDomain(ua)));
        }
        
        
        public async Task<UserAnswerDto?> GetByIdAsync(int id)
        {
            var data = await _repositoryUserAnswer.GetByIdAsync(id);
            return data == null ? null
                : UserAnswerDtoMapper.MapToDto(UserAnswerMapper.MapToDomain(data));
        }

        public async Task<UserAnswerDto> CreateAsync(CreateUserAnswerDto dto)
        {

            var domain = CreateUserAnswerDtoMapper.MapToDomain(dto); // DTO → Domain
            var dataEntity = UserAnswerMapper.MapToData(domain);     // Domain → Data

            await _repositoryUserAnswer.CreateAsync(dataEntity);         // Save to DB

            var domainFromDb = UserAnswerMapper.MapToDomain(dataEntity); // Data → Domain
            return UserAnswerDtoMapper.MapToDto(domainFromDb);            // Domain → DTO
        }


        public async Task UpdateAsync(UpdateUserAnswerDto dto)
        {
            var domain = UpdateUserAnswerDtoMapper.MapToDomain(dto);
            var dataEntity = UserAnswerMapper.MapToData(domain);
            await _repositoryUserAnswer.UpdateAsync(dataEntity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repositoryUserAnswer.DeleteAsync(id);
        }

        public async Task AddRangeAsync(IEnumerable<CreateUserAnswerDto> dtos)
        {
            var userId = _currentUserService.UserId;
            if (userId == null)
                throw new UnauthorizedAccessException("User is not authorized.");

            var entities = new List<Data.Entities.UserAnswer>();

            foreach (var dto in dtos)
            {
                // Пропускаем пустые ответы
                if ((dto.SelectedOptionIds == null || dto.SelectedOptionIds.Count == 0) && string.IsNullOrWhiteSpace(dto.Explanation))
                    continue;

                var answer = new Data.Entities.UserAnswer
                {
                    UserId = userId.Value,
                    QuestionId = dto.QuestionId,
                    TestSessionId = dto.TestSessionId,
                    Explanation = dto.Explanation,
                    Score = dto.Score,
                    AnswerInt = dto.AnswerInt,
                    SelectedOptionJson = JsonSerializer.Serialize(dto.SelectedOptionIds ?? new List<int>())
                };

                entities.Add(answer);
            }

            if (entities.Count > 0)
                await _repositoryUserAnswer.SaveAnswersAsync(entities);
        }

    }

}
