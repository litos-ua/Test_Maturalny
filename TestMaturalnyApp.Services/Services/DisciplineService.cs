using TestMaturalnyApp.Domain.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Services.Services
{
    public class DisciplineService : IDisciplineService, IDisciplineAdminService
    {
        private readonly IDisciplineRepository _disciplineRepository;
        private readonly ILogger<DisciplineService> _logger;

        public DisciplineService(IDisciplineRepository disciplineRepository, ILogger<DisciplineService> logger)
        {
            _disciplineRepository = disciplineRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<Discipline>> GetAllAsync()
        {
            try
            {
                var dataEntities = await _disciplineRepository.GetAllAsync();
                return dataEntities.Select(DisciplineMapper.MapToDomain);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all disciplines");
                throw;
            }
        }

        // --- Админ метод ---
        public async Task<PagedResult<Discipline>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? filter = null,
            string? sortBy = null,
            string? sortOrder = null)
        {
            var repo = _disciplineRepository as IDisciplineAdminRepository
                ?? throw new InvalidOperationException("Repository does not support admin operations.");

            var dataPaged = await repo.GetPagedAsync(pageNumber, pageSize, filter, sortBy, sortOrder);

            return new PagedResult<Discipline>
            {
                Items = dataPaged.Items.Select(DisciplineMapper.MapToDomain).ToList(),
                TotalCount = dataPaged.TotalCount,
                PageNumber = dataPaged.PageNumber,
                PageSize = dataPaged.PageSize
            };
        }


        public async Task<Discipline?> GetByIdAsync(int id)
        {
            try
            {
                var data = await _disciplineRepository.GetByIdAsync(id);
                return data == null ? null : DisciplineMapper.MapToDomain(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting discipline by id: {Id}", id);
                throw;
            }
        }

        public async Task<Discipline> CreateAsync(Discipline domainDiscipline)
        {
            try
            {
                var data = DisciplineMapper.MapToData(domainDiscipline);
                var created = await _disciplineRepository.CreateAsync(data);
                return DisciplineMapper.MapToDomain(created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating discipline");
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                return await _disciplineRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting discipline with id: {Id}", id);
                throw;
            }
        }

        public async Task<Discipline> UpdateAsync(Discipline domainDiscipline)
        {
            try
            {
                var data = DisciplineMapper.MapToData(domainDiscipline);
                var updated = await _disciplineRepository.UpdateAsync(data);
                return DisciplineMapper.MapToDomain(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating discipline with id: {Id}", domainDiscipline.Id);
                throw;
            }
        }
    }

}