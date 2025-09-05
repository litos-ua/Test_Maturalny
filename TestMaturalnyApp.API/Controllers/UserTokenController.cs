using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] 
    public class UserTokenController : ControllerBase
    {
        private readonly IUserTokenService _userTokenService;
        private readonly ILogger<UserTokenController> _logger;

        public UserTokenController(IUserTokenService userTokenService, ILogger<UserTokenController> logger)
        {
            _userTokenService = userTokenService;
            _logger = logger;
        }

        // GET: api/UserToken
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var tokens = await _userTokenService.GetAllAsync();
                return Ok(tokens);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving all user tokens.");
                return StatusCode(500, "An error occurred while retrieving all user tokens.");
            }
        }

        // GET: api/UserToken/user/5
        [HttpGet("user/{userId:int}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            try
            {
                var tokens = await _userTokenService.GetByUserIdAsync(userId);
                return Ok(tokens);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving tokens for user with ID {UserId}.", userId);
                return StatusCode(500, $"An error occurred while retrieving tokens for user with ID {userId}.");
            }
        }

        // DELETE: api/UserToken/id
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _userTokenService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting user token with ID {TokenId}.", id);
                return StatusCode(500, $"An error occurred while deleting the user token with ID {id}.");
            }
        }
    }
}

