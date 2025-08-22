using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserOptionsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Theme = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "light"),
                    Language = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false, defaultValue: "uk"),
                    ReceiveEmailNotifications = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    QuestionPreferencesJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdminMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AverageScore = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    ReservedFlag = table.Column<bool>(type: "bit", nullable: true),
                    ReservedCount = table.Column<int>(type: "int", nullable: true),
                    ReservedNote = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserOptions_UserId",
                table: "UserOptions",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserOptions");
        }
    }
}
