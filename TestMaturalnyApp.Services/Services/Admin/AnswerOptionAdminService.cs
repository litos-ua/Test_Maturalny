using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Services.Mapping;

namespace TestMaturalnyApp.Services.Services.Admin
{
    public class AnswerOptionAdminService : IAnswerOptionAdminService
    {
        private readonly IAnswerOptionAdminRepository _repository;

        public AnswerOptionAdminService(IAnswerOptionAdminRepository repository)
        {
            _repository = repository;
        }

        public async Task<PagedResult<Domain.Entities.AnswerOption>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? filterTerm,
            string? sortField,
            string? sortOrder)
        {
            var dataResult = await _repository.GetPagedAsync(pageNumber, pageSize, filterTerm, sortField, sortOrder);

            return new PagedResult<Domain.Entities.AnswerOption>
            {
                Items = dataResult.Items.Select(AnswerOptionMapper.MapToDomain).ToList(),
                TotalCount = dataResult.TotalCount
            };
        }


        public async Task<PagedResult<Domain.Entities.AnswerOption>> GetPagedOrManyAsync(
            int pageNumber,
            int pageSize,
            string? filterTerm,
            string? sortField,
            string? sortOrder,
            IEnumerable<int>? ids = null)
        {
            if (ids != null && ids.Any())
            {
                var items = await _repository.GetManyAsync(ids);
                return new PagedResult<Domain.Entities.AnswerOption>
                {
                    Items = items.Select(AnswerOptionMapper.MapToDomain).ToList(),
                    TotalCount = items.Count()
                };
            }
            else
            {
                var dataResult = await _repository.GetPagedAsync
                    (pageNumber, 
                    pageSize, 
                    filterTerm, 
                    sortField, 
                    sortOrder
                    );
                return new PagedResult<Domain.Entities.AnswerOption>
                {
                    Items = dataResult.Items.Select(AnswerOptionMapper.MapToDomain).ToList(),
                    TotalCount = dataResult.TotalCount
                };
            }
        }



        public async Task<Domain.Entities.AnswerOption?> GetByIdAsync(int id)
        {
            var dataEntity = await _repository.GetByIdAsync(id);
            return dataEntity == null ? null : AnswerOptionMapper.MapToDomain(dataEntity);
        }

        public async Task<Domain.Entities.AnswerOption> CreateAsync(Domain.Entities.AnswerOption entity)
        {
            var dataEntity = AnswerOptionMapper.MapToData(entity);
            var createdEntity = await _repository.CreateAsync(dataEntity);
            return AnswerOptionMapper.MapToDomain(createdEntity);
        }

        public async Task<Domain.Entities.AnswerOption?> UpdateAsync(Domain.Entities.AnswerOption entity)
        {
            var dataEntity = AnswerOptionMapper.MapToData(entity);
            var updatedEntity = await _repository.UpdateAsync(dataEntity);
            return updatedEntity == null ? null : AnswerOptionMapper.MapToDomain(updatedEntity);
        }

        public Task<bool> DeleteAsync(int id) => _repository.DeleteAsync(id);
    }


}
