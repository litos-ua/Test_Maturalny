using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Data.Configurations
{
    public class TestSessionConfiguration : IEntityTypeConfiguration<TestSession>
    {
        public void Configure(EntityTypeBuilder<TestSession> builder)
        {
            builder.ToTable("TestSessions");

            builder.HasKey(ts => ts.Id);

            builder.Property(ts => ts.Description)
                   .HasMaxLength(200);

            builder.Property(ts => ts.JsonMask)
                   .HasMaxLength(3000)
                   .HasColumnType("nvarchar(max)")
                   .HasDefaultValue("{}");

            builder.Property(ts => ts.StartedAt)
                   .IsRequired()
                   .HasColumnType("datetime2")
                   .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(ts => ts.EndedAt)
                   .HasColumnType("datetime2");

            builder.Property(ts => ts.TimeLimitSeconds);

            builder.Property(ts => ts.EndReason)
                   .HasConversion<string>()  // Enum → string
                   .HasMaxLength(30);

            builder.HasMany(ts => ts.UserAnswers)
                   .WithOne(ua => ua.TestSession)
                   .HasForeignKey(ua => ua.TestSessionId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
