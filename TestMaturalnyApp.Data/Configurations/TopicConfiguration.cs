using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Configurations
{
    public class TopicConfiguration : IEntityTypeConfiguration<Topic>
    {
        public void Configure(EntityTypeBuilder<Topic> builder)
        {
            builder.Property(t => t.Title)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(t => t.Description)
                   .IsRequired()
                   .HasMaxLength(700);

            builder.Property(t => t.Level)
                   .HasConversion<int>()
                   .IsRequired();

            builder.Property(a => a.CreatedAt)
                   .IsRequired()
                   .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(a => a.UpdatedAt)
                   .IsRequired(false);

            builder.HasOne(t => t.Discipline)
                   .WithMany(d => d.Topics)
                   .HasForeignKey("DisciplineId")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
