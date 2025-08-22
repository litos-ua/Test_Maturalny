using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Data.Configurations
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.Property(q => q.Text)
                   .IsRequired()
                   .HasMaxLength(700);

            builder.Property(q => q.ImageUrl)
                   .HasMaxLength(500);

            builder.Property(q => q.Type)
                   .HasConversion<int>()
                   .IsRequired();

            builder.Property(q => q.MaxScore)
                   .HasPrecision(4, 2)
                   .HasDefaultValue(0.0);

            builder.Property(q => q.Difficulty)
                   .HasConversion<int>()
                   .HasDefaultValue(DifficultyOfQuestion.Standard)
                   .IsRequired();

            builder.Property(a => a.CreatedAt)
                   .IsRequired()
                   .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(a => a.UpdatedAt)
                   .IsRequired(false);

            builder.HasOne(q => q.Topic)
                   .WithMany(t => t.Questions)
                   .HasForeignKey(q => q.TopicId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
