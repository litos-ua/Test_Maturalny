using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Domain.Entities;

namespace TestMaturalnyApp.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserAdminService _service;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserAdminService service, ILogger<UsersController> logger)
        {
            _service = service;
            _logger = logger;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetPaged(
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
                int pageNumber = ra_page ?? page ?? 1;
                int pageSize = ra_perPage ?? perPage ?? 10;

                var pagedResult = await _service.GetPagedAsync(pageNumber, pageSize, sortBy, sortOrder, filterJson);
                Response.Headers.Add("X-Total-Count", pagedResult.TotalCount.ToString());

                return Ok(new
                {
                    data = pagedResult.Items,
                    total = pagedResult.TotalCount
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching paged users");
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var user = await _service.GetByIdAsync(id);
                if (user == null) return NotFound();
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            try
            {
                var created = await _service.CreateAsync(user);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] User user)
        {
            try
            {
                if (id != user.Id) return BadRequest();
                await _service.UpdateAsync(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user {Id}", id);
                return StatusCode(500, "Internal server error");
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
                _logger.LogError(ex, "Error deleting user {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

