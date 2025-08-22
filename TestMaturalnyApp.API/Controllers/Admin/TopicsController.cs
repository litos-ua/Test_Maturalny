using Azure;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping.Dto.Create;

namespace TestMaturalnyApp.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class TopicsController : ControllerBase
    {
        private readonly ITopicAdminService _topicAdminService;
        private readonly ILogger<TopicsController> _logger;

        public TopicsController(ITopicAdminService topicAdminService, ILogger<TopicsController> logger)
        {
            _topicAdminService = topicAdminService;
            _logger = logger;
        }

        // GET с пагинацией, сортировкой
        //[HttpGet]
        //public async Task<IActionResult> GetPaged(
        //    [FromQuery(Name = "_page")] int page = 1,
        //    [FromQuery(Name = "_perPage")] int perPage = 10,
        //    [FromQuery(Name = "_sort")] string? sortField = null,
        //    [FromQuery(Name = "_order")] string? sortOrder = null,
        //    [FromQuery(Name = "filter")] string? filterJson = null)

        //{
        //    try
        //    {

        //        var pagedData = await _topicAdminService.GetPagedAsync(page, perPage, sortField, sortOrder, filterJson);

        //        Response.Headers.Add("X-Total-Count", pagedData.TotalCount.ToString());
        //        Response.Headers.Add("Access-Control-Expose-Headers", "X-Total-Count");

        //        //return Ok(pagedData.Items.Select(TopicDtoMapper.MapToDto));
        //        return Ok(new
        //        {
        //            data = pagedData.Items,
        //            total = pagedData.TotalCount,
        //        });


        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error while getting paged topics.");
        //        return StatusCode(500, "An error occurred while retrieving topics.");
        //    }
        //}



        [HttpGet]
        public async Task<IActionResult> GetPaged(
        [FromQuery(Name = "_page")] int page = 1,
        [FromQuery(Name = "_perPage")] int perPage = 10,
        [FromQuery(Name = "_sort")] string? sortField = null,
        [FromQuery(Name = "_order")] string? sortOrder = null,
        [FromQuery(Name = "filter")] string? filterJson = null)
        {
            try
            {
                int? disciplineIdFilter = null;

                if (!string.IsNullOrWhiteSpace(filterJson))
                {
                    try
                    {
                        var dict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(filterJson);
                        if (dict != null && dict.TryGetValue("disciplineId", out var d))
                        {
                            if (d.ValueKind == JsonValueKind.Number && d.TryGetInt32(out int id))
                                disciplineIdFilter = id;
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Invalid filterJson format: {FilterJson}", filterJson);
                    }
                }

                var pagedData = await _topicAdminService.GetPagedAsync(page, perPage, sortField, sortOrder, disciplineIdFilter);

                Response.Headers.Add("X-Total-Count", pagedData.TotalCount.ToString());
                Response.Headers.Add("Access-Control-Expose-Headers", "X-Total-Count");

                return Ok(new
                {
                    data = pagedData.Items,
                    total = pagedData.TotalCount,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting paged topics.");
                return StatusCode(500, "An error occurred while retrieving topics.");
            }
        }



        // GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var topic = await _topicAdminService.GetByIdAsync(id);
                return topic == null
                    ? NotFound($"Topic with ID {id} was not found.")
                    : Ok(TopicDtoMapper.MapToDto(topic));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving topic with ID {TopicId}.", id);
                return StatusCode(500, $"An error occurred while retrieving the topic with ID {id}.");
            }
        }

        

        // POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTopicDto dto)
        {
            try
            {
                var domain = CreateTopicDtoMapper.MapToDomain(dto);
                var created = await _topicAdminService.CreateAsync(domain);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, TopicDtoMapper.MapToDto(created));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating topic.");
                return StatusCode(500, "An error occurred while creating the topic.");
            }
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTopicDto dto)
        {
            try
            {
                var domain = UpdateTopicDtoMapper.MapToDomain(dto);
                domain.Id = id;
                var updated = await _topicAdminService.UpdateAsync(domain);
                return updated == null
                    ? NotFound($"Topic with ID {id} was not found.")
                    : Ok(TopicDtoMapper.MapToDto(updated));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating topic with ID {TopicId}.", id);
                return StatusCode(500, $"An error occurred while updating the topic with ID {id}.");
            }
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _topicAdminService.DeleteAsync(id);
                return deleted
                    ? NoContent()
                    : NotFound($"Topic with ID {id} was not found.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting topic with ID {TopicId}.", id);
                return StatusCode(500, $"An error occurred while deleting the topic with ID {id}.");
            }
        }
    }
}
