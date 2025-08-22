namespace TestMaturalnyApp.Data.Configurations
{

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using TestMaturalnyApp.Data.Entities;

    public class UserAnswerConfiguration : IEntityTypeConfiguration<UserAnswer>
    {
        public void Configure(EntityTypeBuilder<UserAnswer> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.UserId)
                   .IsRequired();

            builder.HasOne<User>() // связь с User
                   .WithMany()
                   .HasForeignKey(u => u.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Property(u => u.QuestionId)
                   .IsRequired();

            builder.HasOne(u => u.Question) // связь с Question
                   .WithMany()
                   .HasForeignKey(u => u.QuestionId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(u => u.SubmittedAt)
                   .HasDefaultValueSql("GETUTCDATE()")
                   .IsRequired();

            builder.Property(u => u.Explanation)
                   .HasMaxLength(500);

            builder.Property(u => u.Score)
                   .HasPrecision(4, 2)
                   .HasDefaultValue(0);

            // 🔧 Новый JSON-поле (сохраняется как строка)
            builder.Property(u => u.SelectedOptionJson)
                    .HasConversion(
                        v => string.IsNullOrWhiteSpace(v) ? "[]" : v,
                        v => string.IsNullOrWhiteSpace(v) ? "[]" : v
                    )
                    .HasMaxLength(300)
                    .HasColumnType("nvarchar(300)")
                    .HasDefaultValue("[]");

            // 🔧 Резервное текстовое поле
            builder.Property(u => u.GroupeLabel)
                   .HasMaxLength(100) 
                   .IsRequired(false)
                   .HasDefaultValue(null);

            // 🔧 Резервное числовое поле
            builder.Property(u => u.AnswerInt)
                   .IsRequired(false)
                   .HasDefaultValue(null);

            // связь с TestSession
            builder.Property(u => u.TestSessionId)
                   .IsRequired(false);

            builder.HasOne(u => u.TestSession)
                   .WithMany(ts => ts.UserAnswers)
                   .HasForeignKey(u => u.TestSessionId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }

}