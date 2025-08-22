using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;
using TestMaturalnyApp.Services.Mapping.Dto;

namespace TestMaturalnyApp.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/answer-options")]
    [Authorize(Roles = "Admin")]
    public class AnswerOptionsController : ControllerBase
    {
        private readonly IAnswerOptionAdminService _service;
        private readonly ILogger<AnswerOptionsController> _logger;

        public AnswerOptionsController(IAnswerOptionAdminService service, ILogger<AnswerOptionsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // GET /api/admin/answer-options?_page=1&_perPage=10&_sort=text&_order=ASC&filter={"q":"term"}
        [HttpGet]
        public async Task<IActionResult> GetPaged(
            [FromQuery(Name = "_page")] int? ra_page,
            [FromQuery(Name = "_perPage")] int? ra_perPage,
            [FromQuery(Name = "_sort")] string? sortBy,
            [FromQuery(Name = "_order")] string? sortOrder,
            [FromQuery(Name = "id")] string? ids,
            [FromQuery(Name = "filter")] string? filterJson)
        {
            try
            {
                int pageNumber = ra_page ?? 1;
                int pageSize = ra_perPage ?? 10;

                string? filterTerm = null;
                if (!string.IsNullOrWhiteSpace(filterJson))
                {
                    try
                    {
                        var doc = JsonSerializer.Deserialize<JsonElement>(filterJson);
                        if (doc.ValueKind == JsonValueKind.Object)
                        {
                            if (doc.TryGetProperty("q", out var q)) filterTerm = q.GetString();
                            else if (doc.TryGetProperty("text", out var t)) filterTerm = t.GetString();
                        }
                    }
                    catch
                    {
                        filterTerm = filterJson;
                    }
                }

                IEnumerable<int>? parsedIds = null;
                if (!string.IsNullOrWhiteSpace(ids))
                {
                    try
                    {
                        parsedIds = ids
                            .Split(',', StringSplitOptions.RemoveEmptyEntries)
                            .Select(x => int.TryParse(x, out var id) ? id : (int?)null)
                            .Where(x => x.HasValue)
                            .Select(x => x.Value)
                            .ToList();
                    }
                    catch
                    {
                        parsedIds = null;
                    }
                }

                //var paged = await _service.GetPagedAsync(pageNumber, pageSize, filterTerm, sortBy, sortOrder);
                var paged = await _service.GetPagedOrManyAsync(
                    pageNumber, 
                    pageSize, 
                    filterTerm, 
                    sortBy, 
                    sortOrder,
                    parsedIds);
                
                var itemsDto = paged.Items.Select(AnswerOptionDtoMapper.MapToDto).ToList();

                Response.Headers["X-Total-Count"] = paged.TotalCount.ToString();
                Response.Headers["Access-Control-Expose-Headers"] = "X-Total-Count";

                return Ok(new
                {
                    data = itemsDto,
                    total = paged.TotalCount
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving paged answer options.");
                return StatusCode(500, "An error occurred while retrieving answer options.");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var entity = await _service.GetByIdAsync(id);
                if (entity == null) return NotFound($"AnswerOption with ID {id} not found.");
                return Ok(AnswerOptionDtoMapper.MapToDto(entity));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving answer option with ID {Id}", id);
                return StatusCode(500, $"Error retrieving answer option with ID {id}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAnswerOptionDto dto)
        {
            try
            {
                var domain = CreateAnswerOptionDtoMapper.MapToDomain(dto);
                var created = await _service.CreateAsync(domain);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, AnswerOptionDtoMapper.MapToDto(created));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating answer option.");
                return StatusCode(500, "An error occurred while creating answer option.");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateAnswerOptionDto dto)
        {
            try
            {
                var domain = UpdateAnswerOptionDtoMapper.MapToDomain(dto);
                domain.Id = id;
                var updated = await _service.UpdateAsync(domain);
                return updated == null ? NotFound($"AnswerOption with ID {id} not found.") : Ok(AnswerOptionDtoMapper.MapToDto(updated));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating answer option with ID {Id}", id);
                return StatusCode(500, $"An error occurred while updating answer option with ID {id}.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _service.DeleteAsync(id);
                return deleted ? NoContent() : NotFound($"AnswerOption with ID {id} not found.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting answer option with ID {Id}", id);
                return StatusCode(500, $"An error occurred while deleting answer option with ID {id}.");
            }
        }
    }
}

