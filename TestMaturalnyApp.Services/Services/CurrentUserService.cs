using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TestMaturalnyApp.Services.Interfaces;

namespace TestMaturalnyApp.Services.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<CurrentUserService> _logger;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor, ILogger<CurrentUserService> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public int? UserId
        {
            get
            {
                try
                {
                    var claimValue = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                    if (int.TryParse(claimValue, out var id))
                        return id;

                    _logger.LogWarning("Unable to convert ClaimTypes.NameIdentifier to int. Value: {ClaimValue}", claimValue);
                    return null;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error trying to get current user id from context");
                    return null;
                }
            }
        }
    }

}