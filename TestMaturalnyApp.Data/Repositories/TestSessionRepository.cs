
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Domain.Entities.Enums;
using TestMaturalnyApp.Domain.Models;

namespace TestMaturalnyApp.Data.Repositories
{
    public class TestSessionRepository : ITestSessionRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TestSessionRepository> _logger;

        public TestSessionRepository(AppDbContext context, ILogger<TestSessionRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<TestSession>> GetAllWithUserAnswersAsync()
        {
            try
            {
                return await _context.TestSessions
                    .Include(s => s.UserAnswers)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all sessions with user responses");
                throw;
            }
        }

        public async Task<TestSession?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.TestSessions
                    .Include(t => t.UserAnswers)
                    .FirstOrDefaultAsync(t => t.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting session by id: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<TestSession>> GetByUserIdAsync(int userId)
        {
            try
            {
                var res = await _context.TestSessions
                    .Include(ts => ts.UserAnswers)
                        .ThenInclude(ua => ua.Question)
                            .ThenInclude(q => q.Topic)
                                .ThenInclude(t => t.Discipline)
                    .Where(ts => ts.UserId == userId)
                    .OrderByDescending(ts => ts.StartedAt)
                    .ToListAsync();


                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting sessions by userId: {UserId}", userId);
                throw;
            }
        }

        // Перегрузка для пагинации
        
        public async Task<PagedResult<TestSession>> GetByUserIdAsync(int userId, int page, int pageSize)
        {
            try
            {
                var query = _context.TestSessions
                    .Include(ts => ts.UserAnswers)
                        .ThenInclude(ua => ua.Question)
                            .ThenInclude(q => q.Topic)
                                .ThenInclude(t => t.Discipline)
                    .Where(ts => ts.UserId == userId && ts.EndedAt.HasValue) // фильтрация завершённых сессий
                    .OrderByDescending(ts => ts.StartedAt);

                var totalCount = await query.CountAsync();

                var items = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return new PagedResult<TestSession>
                {
                    Items = items,
                    TotalCount = totalCount,
                    PageNumber = page,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting paged completed sessions by userId: {UserId}", userId);
                throw;
            }
        }




        public async Task<TestSession?> GetLastCreatedByUserAsync(int userId)
        {
            try
            {
                var timeThreshold = DateTime.UtcNow.AddMinutes(-15);
                return await _context.TestSessions
                    .Where(s => s.UserId == userId && s.StartedAt > timeThreshold)
                    .OrderByDescending(s => s.StartedAt)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting last created session by userId: {UserId}", userId);
                throw;
            }
        }

        public async Task<TestSession?> GetActiveByUserIdAsync(int userId)
        {
            try
            {
                return await _context.TestSessions
                    .Where(s => s.UserId == userId && s.EndedAt == null)
                    .OrderByDescending(s => s.StartedAt)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting active session by userId: {UserId}", userId);
                throw;
            }
        }

        public async Task<TestSession?> GetBySessionIdWithDetailsAsync(int sessionId)
        {
            try
            {
                return await _context.TestSessions
                    .Include(s => s.UserAnswers)
                        .ThenInclude(ua => ua.Question)
                            .ThenInclude(q => q.Topic)
                    .FirstOrDefaultAsync(s => s.Id == sessionId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting session details by sessionId: {SessionId}", sessionId);
                throw;
            }
        }


        public async Task<TestSession> CreateAsync(TestSession session)
        {
            try
            {
                _context.TestSessions.Add(session);
                await _context.SaveChangesAsync();
                return session;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating session");
                throw;
            }
        }

        public async Task<TestSession> UpdateAsync(TestSession session)
        {
            try
            {
                _context.TestSessions.Update(session);
                await _context.SaveChangesAsync();
                return session;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating session with id: {Id}", session.Id);
                throw;
            }
        }

        public async Task<TestSession?> EndSessionAsync(int sessionId, DateTime endTime, SessionEndReason reason)
        {
            try
            {
                var session = await _context.TestSessions.FindAsync(sessionId);
                if (session == null)
                {
                    _logger.LogWarning("Attempt to terminate non-existent session with id: {SessionId}", sessionId);
                    return null;
                }

                session.EndedAt = endTime;
                session.EndReason = reason;

                await _context.SaveChangesAsync();
                return session;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error ending session with id: {SessionId}", sessionId);
                throw;
            }
        }

        public async Task SaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving changes to context");
                throw;
            }
        }  
    }
   }