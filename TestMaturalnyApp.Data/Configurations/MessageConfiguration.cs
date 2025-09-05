using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TestMaturalnyApp.Data.Entities;

namespace TestMaturalnyApp.Data.Configurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            // Явное имя таблицы
            builder.ToTable("Messages");

            // Первичный ключ
            builder.HasKey(m => m.Id);

            // Связь с отправителем
            builder.HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict); // чтобы при удалении юзера не удалялись все сообщения

            // Связь с получателем
            builder.HasOne(m => m.Receiver)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // Ограничения по полям
            builder.Property(m => m.Content)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(m => m.SentAt)
                .IsRequired();

            builder.Property(m => m.ReadAt)
                .IsRequired(false);
        }
    }
}
