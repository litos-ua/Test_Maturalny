using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Domain.Entities.DTOs;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Teacher,Student")]
    public class UserOptionController : ControllerBase
    {
        private readonly IUserOptionService _optionService;
        private readonly ILogger<UserOptionController> _logger;

        public UserOptionController(IUserOptionService optionService, ILogger<UserOptionController> logger)
        {
            _optionService = optionService;
            _logger = logger;
        }

        [HttpGet("by-user/{userId}")]
        public async Task<ActionResult<UserOptionDto>> GetByUserId(int userId)
        {
            try
            {
                var option = await _optionService.GetByUserIdAsync(userId);
                if (option == null)
                    return NotFound($"User options for user ID {userId} were not found.");

                return Ok(option);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving user options for user ID {UserId}.", userId);
                return StatusCode(500, $"An error occurred while retrieving user options for user ID {userId}.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserOptionDto>> GetById(int id)
        {
            try
            {
                var option = await _optionService.GetByIdAsync(id);
                if (option == null)
                    return NotFound($"User option with ID {id} was not found.");

                return Ok(option);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving user option with ID {OptionId}.", id);
                return StatusCode(500, $"An error occurred while retrieving the user option with ID {id}.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserOptionDto>> Create(CreateUserOptionDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var created = await _optionService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating user option.");
                return StatusCode(500, "An error occurred while creating the user option.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateUserOptionDto dto)
        {
            try
            {
                await _optionService.UpdateAsync(dto);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating user option with ID {OptionId}.", dto.Id);
                return StatusCode(500, $"An error occurred while updating the user option with ID {dto.Id}.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _optionService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting user option with ID {OptionId}.", id);
                return StatusCode(500, $"An error occurred while deleting the user option with ID {id}.");
            }
        }
    }
}

