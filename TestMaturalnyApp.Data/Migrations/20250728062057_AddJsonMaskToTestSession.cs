using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddJsonMaskToTestSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "JsonMask",
                table: "TestSessions",
                type: "nvarchar(max)",
                maxLength: 3000,
                nullable: false,
                defaultValue: "{}");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JsonMask",
                table: "TestSessions");
        }
    }
}
