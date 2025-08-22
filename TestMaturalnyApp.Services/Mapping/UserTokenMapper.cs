
namespace TestMaturalnyApp.Services.Mapping
{
    public static class UserTokenMapper
    {
        public static Domain.Entities.UserToken MapToDomain(Data.Entities.UserToken data) => new()
        {
            Id = data.Id,
            UserId = data.UserId,
            Token = data.Token,
            ExpiresAt = data.ExpiresAt,
            CreatedAt = data.CreatedAt,
            CreatedByIp = data.CreatedByIp,
            RevokedAt = data.RevokedAt,
            RevokedByIp = data.RevokedByIp
        };

        public static Data.Entities.UserToken MapToData(Domain.Entities.UserToken domain) => new()
        {
            Id = domain.Id,
            UserId = domain.UserId,
            Token = domain.Token,
            ExpiresAt = domain.ExpiresAt,
            CreatedAt = domain.CreatedAt,
            CreatedByIp = domain.CreatedByIp,
            RevokedAt = domain.RevokedAt,
            RevokedByIp = domain.RevokedByIp
        };
    }
}
