using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping.Dto.Create;


namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TopicsController : ControllerBase
    {
        private readonly ITopicService _service;
        private readonly ILogger<TopicsController> _logger;

        public TopicsController(ITopicService service, ILogger<TopicsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var topics = await _service.GetAllAsync();
                return Ok(topics.Select(TopicDtoMapper.MapToDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving all topics.");
                return StatusCode(500, "An error occurred while retrieving the list of topics.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var topic = await _service.GetByIdAsync(id);
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

        [HttpGet("by-discipline/{disciplineId}")]
        public async Task<IActionResult> GetByDisciplineId(int disciplineId)
        {
            try
            {
                var topics = await _service.GetByDisciplineIdAsync(disciplineId);
                return Ok(topics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving topics for discipline ID {DisciplineId}.", disciplineId);
                return StatusCode(500, $"An error occurred while retrieving topics for discipline ID {disciplineId}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTopicDto dto)
        {
            try
            {
                var domain = CreateTopicDtoMapper.MapToDomain(dto);
                var created = await _service.CreateAsync(domain);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, TopicDtoMapper.MapToDto(created));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating topic.");
                return StatusCode(500, "An error occurred while creating the topic.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTopicDto dto)
        {
            try
            {
                var domain = UpdateTopicDtoMapper.MapToDomain(dto);
                domain.Id = id;
                var updated = await _service.UpdateAsync(domain);
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _service.DeleteAsync(id);
                return success ? NoContent() : NotFound($"Topic with ID {id} was not found.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting topic with ID {TopicId}.", id);
                return StatusCode(500, $"An error occurred while deleting the topic with ID {id}.");
            }
        }
    }
}

