using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Domain.Models;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;

namespace TestMaturalnyApp.API.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class DisciplinesController : ControllerBase
    {
        private readonly IDisciplineAdminService _service;
        private readonly ILogger<DisciplinesController> _logger;

        public DisciplinesController(IDisciplineAdminService service, ILogger<DisciplinesController> logger)
        {
            _service = service;
            _logger = logger;
        }

        /// <summary>
        /// Получить дисциплины с пагинацией
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllForReactAdmin(
            [FromQuery(Name = "_page")] int? ra_page,
            [FromQuery(Name = "_perPage")] int? ra_perPage,
            [FromQuery(Name = "page")] int? page,
            [FromQuery(Name = "perPage")] int? perPage,
            [FromQuery(Name = "_sort")] string? sortBy,
            [FromQuery(Name = "_order")] string? sortOrder,
            [FromQuery(Name = "filter")] string? filterJson)
        {
            try
            {
                // pick whichever param set is provided (support both variants)
                int pageNumber = ra_page ?? page ?? 1;
                int pageSize = ra_perPage ?? perPage ?? 10;

                // optional: parse filter param if RA sends JSON like {"q":"term"} or {"name":"..."}
                string? filterTerm = null;
                if (!string.IsNullOrWhiteSpace(filterJson))
                {
                    try
                    {
                        var dict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(filterJson);
                        if (dict != null)
                        {
                            if (dict.TryGetValue("q", out var q)) filterTerm = q.GetString();
                            else if (dict.TryGetValue("name", out var n)) filterTerm = n.GetString();
                            // extend parsing rules as needed
                        }
                    }
                    catch
                    {
                        // ignore parse errors, use raw string
                        filterTerm = filterJson;
                    }
                }

                var paged = await _service.GetPagedAsync(pageNumber, pageSize, filterTerm, sortBy, sortOrder);

                // Map to DTOs (your DTOs have lowercase 'id' — OK)
                var itemsDto = paged.Items.Select(DisciplineDtoMapper.MapToDto).ToList();

                // IMPORTANT: React-Admin expects array in body + X-Total-Count header
                Response.Headers["X-Total-Count"] = paged.TotalCount.ToString();
                // make header accessible to browser (also add in CORS policy — see below)
                Response.Headers["Access-Control-Expose-Headers"] = "X-Total-Count";

                //return Ok(itemsDto);
                // Формат для React Admin
                return Ok(new
                {
                    data = itemsDto,
                    total = paged.TotalCount,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving paged disciplines for admin.");
                return StatusCode(500, "An error occurred while retrieving disciplines.");
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
                var deleted = await _service.DeleteAsync(id);
                return deleted
                    ? NoContent()
                    : NotFound($"Discipline with ID {id} was not found.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting discipline with ID {DisciplineId}.", id);
                return StatusCode(500, $"An error occurred while deleting the discipline with ID {id}.");
            }
        }
    }
}

