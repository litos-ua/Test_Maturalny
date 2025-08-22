using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserAnswerOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Удаляем внешние ключи, ссылающиеся на UserAnswerOptions
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswerOptions_AnswerOptions_AnswerOptionId",
                table: "UserAnswerOptions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswerOptions_UserAnswers_UserAnswerId",
                table: "UserAnswerOptions");

            // 2. Удаляем индексы
            migrationBuilder.DropIndex(
                name: "IX_UserAnswerOptions_AnswerOptionId",
                table: "UserAnswerOptions");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswerOptions_UserAnswerId",
                table: "UserAnswerOptions");

            // 3. Удаляем саму таблицу
            migrationBuilder.DropTable(
                name: "UserAnswerOptions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // 1. Воссоздаем таблицу
            migrationBuilder.CreateTable(
                name: "UserAnswerOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserAnswerId = table.Column<int>(type: "int", nullable: false),
                    AnswerOptionId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    MatchIndex = table.Column<int>(type: "int", nullable: true),
                    MatchLabel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswerOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAnswerOptions_AnswerOptions_AnswerOptionId",
                        column: x => x.AnswerOptionId,
                        principalTable: "AnswerOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserAnswerOptions_UserAnswers_UserAnswerId",
                        column: x => x.UserAnswerId,
                        principalTable: "UserAnswers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // 2. Воссоздаем индексы
            migrationBuilder.CreateIndex(
                name: "IX_UserAnswerOptions_AnswerOptionId",
                table: "UserAnswerOptions",
                column: "AnswerOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswerOptions_UserAnswerId",
                table: "UserAnswerOptions",
                column: "UserAnswerId");
        }
    }
}
