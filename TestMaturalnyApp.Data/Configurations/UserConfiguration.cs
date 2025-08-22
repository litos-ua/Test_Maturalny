using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Username)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(u => u.Email)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(u => u.PasswordHash)
                   .IsRequired();

            builder.Property(u => u.Fullname)
                   .HasMaxLength(100);

            builder.Property(u => u.Address)
                   .HasMaxLength(200);

            builder.Property(u => u.PhoneNumber)
                   .HasMaxLength(20);

            builder.Property(u => u.Role)
                   .IsRequired();

            builder.Property(u => u.CreatedAt)
                   .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(u => u.IsLocked)
                   .HasDefaultValue(false);

            builder.Property(u => u.AccessFailedCount)
                   .HasDefaultValue(0);

            builder.Property(u => u.PasswordResetToken)
                   .HasMaxLength(200);

            builder.HasMany(u => u.UserTokens)
                   .WithOne(t => t.User)
                   .HasForeignKey(t => t.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Связь с опциями
            builder.HasOne(u => u.Option)
                   .WithOne(o => o.User)
                   .HasForeignKey<UserOption>(o => o.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
