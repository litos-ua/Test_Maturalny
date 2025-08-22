using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class AndUpdateUserAnswer_AddSelectedOptionJsonGroupeLabelAnswerInt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Добавляем новое JSON-поле для хранения выбранных опций
            migrationBuilder.AddColumn<string>(
                name: "SelectedOptionJson",
                table: "UserAnswers",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "[]");

            // Добавляем резервное текстовое поле
            migrationBuilder.AddColumn<string>(
                name: "GroupeLabel",
                table: "UserAnswers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            // Добавляем резервное числовое поле
            migrationBuilder.AddColumn<int>(
                name: "AnswerInt",
                table: "UserAnswers",
                type: "int",
                nullable: true);

            // Обновляем существующие записи (опционально)
            migrationBuilder.Sql(@"
            UPDATE UserAnswers 
            SET SelectedOptionJson = '[]' 
            WHERE SelectedOptionJson IS NULL
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Удаляем добавленные колонки при откате
            migrationBuilder.DropColumn(
                name: "SelectedOptionJson",
                table: "UserAnswers");

            migrationBuilder.DropColumn(
                name: "GroupeLabel",
                table: "UserAnswers");

            migrationBuilder.DropColumn(
                name: "AnswerInt",
                table: "UserAnswers");
        }
    }
}
