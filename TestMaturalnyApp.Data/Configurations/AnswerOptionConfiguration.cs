using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Configurations
{
    public class AnswerOptionConfiguration : IEntityTypeConfiguration<AnswerOption>
    {
        public void Configure(EntityTypeBuilder<AnswerOption> builder)
        {
            builder.Property(a => a.Text)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(a => a.Explanation)
                   .HasMaxLength(500);

            builder.Property(a => a.GroupKey)
                   .HasMaxLength(50);

            builder.Property(a => a.MatchLabel)
                   .HasMaxLength(200);

            builder.Property(a => a.CreatedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()"); 

            builder.Property(a => a.UpdatedAt)
                .IsRequired(false);

            builder.HasOne(a => a.Question)
                   .WithMany(q => q.Options)
                   .HasForeignKey(a => a.QuestionId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
