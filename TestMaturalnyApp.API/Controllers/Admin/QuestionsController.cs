using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Update;

namespace TestMaturalnyApp.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/questions")]
    [Authorize(Roles = "Admin")]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionAdminService _service;
        private readonly ILogger<QuestionsController> _logger;

        public QuestionsController(IQuestionAdminService service, ILogger<QuestionsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // GET /api/admin/questions?_page=1&_perPage=10&_sort=text&_order=ASC&filter={"q":"term"}




        //[HttpGet]
        //public async Task<IActionResult> GetPaged(
        //    [FromQuery(Name = "_page")] int? ra_page,
        //    [FromQuery(Name = "_perPage")] int? ra_perPage,
        //    [FromQuery(Name = "page")] int? page,
        //    [FromQuery(Name = "perPage")] int? perPage,
        //    [FromQuery(Name = "_sort")] string? sortBy,
        //    [FromQuery(Name = "_order")] string? sortOrder,
        //    [FromQuery(Name = "id")] string? ids,   // 👇 принимаем строкой
        //    [FromQuery(Name = "filter")] string? filterJson)
        //{
        //    try
        //    {
        //        int pageNumber = ra_page ?? page ?? 1;
        //        int pageSize = ra_perPage ?? perPage ?? 10;

        //        string? filterTerm = null;
        //        if (!string.IsNullOrWhiteSpace(filterJson))
        //        {
        //            try
        //            {
        //                var doc = JsonSerializer.Deserialize<JsonElement>(filterJson);
        //                if (doc.ValueKind == JsonValueKind.Object)
        //                {
        //                    if (doc.TryGetProperty("q", out var q)) filterTerm = q.GetString();
        //                    else if (doc.TryGetProperty("text", out var t)) filterTerm = t.GetString();
        //                    else if (doc.TryGetProperty("topicId", out var tid)) filterTerm = tid.ToString();
        //                }
        //            }
        //            catch
        //            {
        //                filterTerm = filterJson;
        //            }
        //        }

        //        IEnumerable<int>? parsedIds = null;
        //        if (!string.IsNullOrWhiteSpace(ids))
        //        {
        //            try
        //            {
        //                parsedIds = ids
        //                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
        //                    .Select(x => int.TryParse(x, out var id) ? id : (int?)null)
        //                    .Where(x => x.HasValue)
        //                    .Select(x => x.Value)
        //                    .ToList();
        //            } catch
        //            { 
        //                parsedIds = null;
        //            }
        //        }

        //        var paged = await _service.GetPagedOrManyAsync(
        //            pageNumber: pageNumber,
        //            pageSize: pageSize,
        //            ids: parsedIds,
        //            filter: filterTerm,
        //            sortField: sortBy,
        //            sortOrder: sortOrder);

        //        var itemsDto = paged.Items.Select(QuestionDtoMapper.MapToDto).ToList();

        //        Response.Headers["X-Total-Count"] = paged.TotalCount.ToString();
        //        Response.Headers["Access-Control-Expose-Headers"] = "X-Total-Count";

        //        return Ok(new
        //        {
        //            data = itemsDto,
        //            total = paged.TotalCount,
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error while retrieving paged questions for admin.");
        //        return StatusCode(500, "An error occurred while retrieving questions.");
        //    }
        //}


        [HttpGet]
        public async Task<IActionResult> GetPaged(
            [FromQuery(Name = "_page")] int? ra_page,
            [FromQuery(Name = "_perPage")] int? ra_perPage,
            [FromQuery(Name = "page")] int? page,
            [FromQuery(Name = "perPage")] int? perPage,
            [FromQuery(Name = "_sort")] string? sortBy,
            [FromQuery(Name = "_order")] string? sortOrder,
            [FromQuery(Name = "id")] string? ids,  // для массива
            [FromQuery(Name = "disciplineId")] int? disciplineId,
            [FromQuery(Name = "topicId")] int? topicId,
            [FromQuery(Name = "filter")] string? filterJson)
        {
            try
            {
                int pageNumber = ra_page ?? page ?? 1;
                int pageSize = ra_perPage ?? perPage ?? 10;

                //string? filterTerm = null;
                //if (!string.IsNullOrWhiteSpace(filterJson))
                //{
                //    try
                //    {
                //        var doc = JsonSerializer.Deserialize<JsonElement>(filterJson);
                //        if (doc.ValueKind == JsonValueKind.Object)
                //        {
                //            if (doc.TryGetProperty("q", out var q)) filterTerm = q.GetString();
                //            else if (doc.TryGetProperty("text", out var t)) filterTerm = t.GetString();
                //            else if (doc.TryGetProperty("topicId", out var tid)) filterTerm = tid.ToString();
                //        }
                //    }
                //    catch
                //    {
                //        filterTerm = filterJson;
                //    }
                //}


                int? filterDisciplineId = null;
                int? filterTopicId = null;
                string? filterTerm = null;

                if (!string.IsNullOrWhiteSpace(filterJson))
                {
                    try
                    {
                        var doc = JsonSerializer.Deserialize<JsonElement>(filterJson);
                        if (doc.ValueKind == JsonValueKind.Object)
                        {
                            if (doc.TryGetProperty("q", out var q))
                                filterTerm = q.GetString();

                            if (doc.TryGetProperty("text", out var t))
                                filterTerm = t.GetString();

                            if (doc.TryGetProperty("topicId", out var tid) && tid.ValueKind == JsonValueKind.Number)
                                filterTopicId = tid.GetInt32();

                            if (doc.TryGetProperty("disciplineId", out var did) && did.ValueKind == JsonValueKind.Number)
                                filterDisciplineId = did.GetInt32();
                        }
                    }
                    catch
                    {
                        filterTerm = filterJson;
                    }
                }

                //-------------------------
                if (filterDisciplineId.HasValue)
                {
                    // ✅ Сюда попадём только если в фильтре был disciplineId
                    //_logger.LogInformation("Фильтр по дисциплине: {DisciplineId}", filterDisciplineId);

                    int a = 1;
                    // System.Diagnostics.Debugger.Break();
                }
                //-------------------------



                IEnumerable<int>? parsedIds = null;
                if (!string.IsNullOrWhiteSpace(ids))
                {
                    parsedIds = ids
                        .Split(',', StringSplitOptions.RemoveEmptyEntries)
                        .Select(x => int.TryParse(x, out var id) ? id : (int?)null)
                        .Where(x => x.HasValue)
                        .Select(x => x.Value)
                        .ToList();
                }

                int? b = disciplineId;

                var paged = await _service.GetPagedOrManyAsync(
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    ids: parsedIds,
                    disciplineId: filterDisciplineId ?? disciplineId,
                    topicId: filterTopicId ?? topicId,
                    filter: filterTerm,
                    sortField: sortBy,
                    sortOrder: sortOrder);



                var itemsDto = paged.Items.Select(QuestionDtoMapper.MapToDto).ToList();

                Response.Headers["X-Total-Count"] = paged.TotalCount.ToString();
                Response.Headers["Access-Control-Expose-Headers"] = "X-Total-Count";

                return Ok(new
                {
                    data = itemsDto,
                    total = paged.TotalCount,
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving paged questions for admin.");
                return StatusCode(500, "An error occurred while retrieving questions.");
            }
        }



        // GET api/admin/questions/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var q = await _service.GetByIdAsync(id);
                if (q == null) return NotFound($"Question with ID {id} was not found.");
                return Ok(QuestionDtoMapper.MapToDto(q));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving question with ID {QuestionId}.", id);
                return StatusCode(500, $"An error occurred while retrieving question with ID {id}.");
            }
        }

        // POST api/admin/create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateQuestionDto dto)
        {
            try
            {
                var domain = CreateQuestionDtoMapper.MapToDomain(dto); // maps options as well
                var created = await _service.CreateAsync(domain);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, QuestionDtoMapper.MapToDto(created));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating question.");
                return StatusCode(500, "An error occurred while creating the question.");
            }
        }

        // PUT api/admin/update/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateQuestionDto dto)
        {
            try
            {
                var domain = UpdateQuestionDtoMapper.MapToDomain(dto);
                domain.Id = id;
                var updated = await _service.UpdateAsync(domain);
                return updated == null ? NotFound($"Question with ID {id} was not found.") : Ok(QuestionDtoMapper.MapToDto(updated));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating question with ID {QuestionId}.", id);
                return StatusCode(500, $"An error occurred while updating the question with ID {id}.");
            }
        }

        // DELETE api/admin/questions/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _service.DeleteAsync(id);
                return deleted ? NoContent() : NotFound($"Question with ID {id} was not found.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting question with ID {QuestionId}.", id);
                return StatusCode(500, $"An error occurred while deleting the question with ID {id}.");
            }
        }
    }
}

