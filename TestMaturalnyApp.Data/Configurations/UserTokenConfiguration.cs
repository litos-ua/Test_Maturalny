using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Configurations
{
    public class UserTokenConfiguration : IEntityTypeConfiguration<UserToken>
    {
        public void Configure(EntityTypeBuilder<UserToken> builder)
        {
            builder.ToTable("UserTokens");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Token)
                   .IsRequired()
                   .HasMaxLength(500);

            builder.Property(t => t.CreatedAt)
                   .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(t => t.ExpiresAt)
                   .IsRequired();

            builder.Property(t => t.CreatedByIp)
                   .HasMaxLength(45);

            builder.Property(t => t.RevokedByIp)
                   .HasMaxLength(45);

            builder.HasOne(t => t.User)
                   .WithMany(u => u.UserTokens)
                   .HasForeignKey(t => t.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
