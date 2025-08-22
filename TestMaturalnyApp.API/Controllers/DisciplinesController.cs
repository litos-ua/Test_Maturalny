
using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;

namespace TestMaturalnyApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisciplinesController : ControllerBase
    {
        private readonly IDisciplineService _service;
        private readonly ILogger<DisciplinesController> _logger;

        public DisciplinesController(IDisciplineService service, ILogger<DisciplinesController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var disciplines = await _service.GetAllAsync();
                return Ok(disciplines.Select(DisciplineDtoMapper.MapToDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving all disciplines.");
                return StatusCode(500, "An error occurred while retrieving the list of disciplines.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var discipline = await _service.GetByIdAsync(id);
                return discipline == null
                    ? NotFound($"Discipline with ID {id} was not found.")
                    : Ok(DisciplineDtoMapper.MapToDto(discipline));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving discipline with ID {DisciplineId}.", id);
                return StatusCode(500, $"An error occurred while retrieving the discipline with ID {id}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDisciplineDto dto)
        {
            try
            {
                var domain = CreateDisciplineDtoMapper.MapToDomain(dto);
                var created = await _service.CreateAsync(domain);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, DisciplineDtoMapper.MapToDto(created));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating discipline.");
                return StatusCode(500, "An error occurred while creating the discipline.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDisciplineDto dto)
        {
            try
            {
                var domain = UpdateDisciplineDtoMapper.MapToDomain(dto);
                domain.Id = id;
                var updated = await _service.UpdateAsync(domain);
                return updated == null
                    ? NotFound($"Discipline with ID {id} was not found.")
                    : Ok(DisciplineDtoMapper.MapToDto(updated));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating discipline with ID {DisciplineId}.", id);
                return StatusCode(500, $"An error occurred while updating the discipline with ID {id}.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting discipline with ID {DisciplineId}.", id);
                return StatusCode(500, $"An error occurred while deleting the discipline with ID {id}.");
            }
        }
    }
}
