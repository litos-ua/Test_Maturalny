using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Configurations
{
    public class UserOptionConfiguration : IEntityTypeConfiguration<UserOption>
    {
        public void Configure(EntityTypeBuilder<UserOption> builder)
        {
            builder.ToTable("UserOptions");

            builder.HasKey(o => o.Id);

            builder.HasOne(o => o.User)
                   .WithOne(u => u.Option)
                   .HasForeignKey<UserOption>(o => o.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(o => o.Theme)
                   .HasMaxLength(20)
                   .IsRequired()
                   .HasDefaultValue("light");

            builder.Property(o => o.Language)
                   .HasMaxLength(10)
                   .IsRequired()
                   .HasDefaultValue("uk");

            builder.Property(o => o.ReceiveEmailNotifications)
                   .IsRequired()
                   .HasDefaultValue(true);

            builder.Property(o => o.AverageScore)
                   .HasDefaultValue(0.0);

            builder.Property(o => o.ReservedNote)
                   .HasMaxLength(200)
                   .HasDefaultValue(null);


            builder.Property(o => o.ReservedFlag)
                   .HasDefaultValue(null);

            builder.Property(o => o.ReservedCount)
                   .HasDefaultValue(null);
        }
    }
}
