using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserAnswerOptionStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAnswerOptions",
                table: "UserAnswerOptions");

            migrationBuilder.AddColumn<int>(
                name: "MatchIndex",
                table: "UserAnswerOptions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MatchLabel",
                table: "UserAnswerOptions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAnswerOptions",
                table: "UserAnswerOptions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswerOptions_UserAnswerId",
                table: "UserAnswerOptions",
                column: "UserAnswerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAnswerOptions",
                table: "UserAnswerOptions");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswerOptions_UserAnswerId",
                table: "UserAnswerOptions");

            migrationBuilder.DropColumn(
                name: "MatchIndex",
                table: "UserAnswerOptions");

            migrationBuilder.DropColumn(
                name: "MatchLabel",
                table: "UserAnswerOptions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAnswerOptions",
                table: "UserAnswerOptions",
                columns: new[] { "UserAnswerId", "AnswerOptionId" });
        }
    }
}
