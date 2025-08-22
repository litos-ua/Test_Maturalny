
using Microsoft.AspNetCore.Mvc;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Mapping.Dto;
using TestMaturalnyApp.Domain.Entities.DTOs.Create;
using TestMaturalnyApp.Services.Mapping.Dto.Create;
using TestMaturalnyApp.Domain.Entities.DTOs.Update;
using TestMaturalnyApp.Services.Mapping.Dto.Update;
using TestMaturalnyApp.API.Extensions;
using TestMaturalnyApp.Data.Repositories;


namespace TestMaturalnyApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _service;
        private readonly ICurrentUserService _currentUserService;

        public QuestionsController(IQuestionService service, ICurrentUserService currentUserService)
        {
            _service = service;
            _currentUserService = currentUserService;
        }

        // Получить все вопросы (DTO)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var questions = await _service.GetAllAsync();
                var dto = questions.Select(QuestionDtoMapper.MapToDto);
                return Ok(dto);
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error retrieving data", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // Получить вопрос по ID (DTO)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var question = await _service.GetByIdAsync(id);
                return question == null
                    ? NotFound(new { Title = "Question not found", Status = 404 })
                    : Ok(QuestionDtoMapper.MapToDto(question));
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error retrieving question", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // Получить все вопросы по дисциплине
        [HttpGet("by-discipline/{disciplineId}")]
        public async Task<IActionResult> GetByDisciplineId(int disciplineId)
        {
            try
            {
                var questions = await _service.GetByDisciplineIdAsync(disciplineId);
                return Ok(questions);
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error retrieving questions", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // Получить определяемое на сервере количество вопросов по дисциплине  ------------
        [HttpGet("by-discipline-shuffled/{disciplineId}")]
        public async Task<IActionResult> GetByDisciplineIdShuffled(int disciplineId)
        {
            try
            {
                var questions = await _service.GetByDisciplineIdAsync(disciplineId);
                return Ok(questions);
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error retrieving questions", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // Получить все вопросы по теме
        [HttpGet("by-topic/{topicId}")]
        public async Task<IActionResult> GetByTopic(int topicId)
        {
            try
            {
                var questions = await _service.GetByTopicIdAsync(topicId);
                return Ok(questions);
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error retrieving questions", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // Создать новый вопрос (DTO)
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateQuestionDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var question = CreateQuestionDtoMapper.MapToDomain(dto);
                var created = await _service.CreateAsync(question);

                return CreatedAtAction(nameof(GetById),new { id = created.Id },QuestionDtoMapper.MapToDto(created));
            }
            catch (CustomValidationException ex)
            {
                return BadRequest(new
                {
                    Title = "Validation error.",
                    Status = 400,
                    Errors = ex.ValidationErrors
                });
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Error = "Error saving data." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Internal Server Error" });
            }
        }



        // Обновить существующий вопрос (DTO)
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateQuestionDto dto)
        {
            try
            {
                if (id != dto.id)
                    return BadRequest(new { Title = "ID mismatch", Status = 400 });

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var domainModel = UpdateQuestionDtoMapper.MapToDomain(dto);
                var updated = await _service.UpdateAsync(domainModel);

                return updated == null
                    ? NotFound(new { Title = "Question not found", Status = 404 })
                    : Ok(QuestionDtoMapper.MapToDto(updated));
            }
            catch (CustomValidationException ex)
            {
                return BadRequest(new
                {
                    Title = "Validation error",
                    Status = 400,
                    Errors = ex.ValidationErrors
                });
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error saving data", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // Удалить вопрос
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _service.DeleteAsync(id);
                return result
                    ? NoContent()
                    : NotFound(new { Title = "Question not found", Status = 404 });
            }
            catch (RepositoryException ex)
            {
                return StatusCode(500, new { Title = "Error deleting data", Status = 500 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Title = "Internal Server Error", Status = 500 });
            }
        }

        // ===== Дополнительные маршруты для генерации вопросов =====

        // Получить N случайных вопросов по теме
        [HttpGet("random/by-topic/{topicId}/{count}")]
        public async Task<IActionResult> GetRandomByTopic(int topicId, int count)
        {
            try { 
                var questions = await _service.GetRandomByTopicAsync(topicId, count);
                return Ok(questions);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error creating real test.");
            }
        }

        // Получить по countPerTopic случайных вопросов из каждой темы дисциплины
        [HttpGet("random/by-discipline/grouped/{disciplineId}/{countPerTopic}")]
        public async Task<IActionResult> GetRandomByDisciplineGroupedByTopic(int disciplineId, int countPerTopic)
        {
            var questions = await _service.GetRandomByDisciplineGroupedByTopicAsync(disciplineId, countPerTopic);
            return Ok(questions);
        }

        // Получить totalCount случайных вопросов по всей дисциплине
        [HttpGet("random/by-discipline/{disciplineId}/{totalCount}")]
        public async Task<IActionResult> GetRandomByDiscipline(int disciplineId, int totalCount)
        {
            try
            { 
                var questions = await _service.GetRandomByDisciplineAsync(disciplineId, totalCount);
                return Ok(questions);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Error creating test.");
            }
        }

        //// Получить totalCount случайных вопросов по всей дисциплине с перемешиванием опций и созданием сессии
        //[HttpPost("exam/start")]
        //[Authorize]
        //public async Task<IActionResult> StartExamSession([FromBody] StartExamRequestDto request)
        //{
        //    try
        //    {
        //        // Получаем id текущего аутентифицированного пользователя
        //        var userId = _currentUserService.UserId;

        //        if (userId == null)
        //            return Unauthorized();

        //        // ✅ Сравнение — пользователь не должен подделывать userId
        //        if (request.UserId != userId)
        //            return Unauthorized("User ID in request does not match the authenticated user.");

        //        // ✅ Создаем перемешанную сессию и вопросы
        //        var result = await _service.CreateRandomRealTestAsync(
        //            request.DisciplineId,
        //            request.TotalCount,
        //            userId.Value,
        //            request.TimeLimitSeconds,
        //            request.Description  
        //        );

        //        return Ok(result);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Ошибка при запуске сессии теста: {ex.Message}");
        //        return StatusCode(500, "Ошибка при запуске сессии теста.");
        //    }
        //}

    }
}