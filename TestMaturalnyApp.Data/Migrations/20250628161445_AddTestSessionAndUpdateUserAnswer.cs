using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTestSessionAndUpdateUserAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TestSessionId",
                table: "UserAnswers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TestSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    StartedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TimeLimitSeconds = table.Column<int>(type: "int", nullable: true),
                    EndReason = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestSessions", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2545));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2547));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2623));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2625));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2626));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2627));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2628));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 8,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2629));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 9,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2630));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 10,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2631));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 11,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2632));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 12,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2633));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 107,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2683));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 108,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2685));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 109,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2686));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1985));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1993));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1994));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1995));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1996));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1997));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(1998));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2509));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2513));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2514));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2664));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2224));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2237));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2239));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2240));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2241));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2243));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2244));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 8,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2245));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 9,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2246));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 10,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2248));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 11,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2249));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 12,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2250));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 13,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2251));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 14,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2252));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 15,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2252));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 16,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2253));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 17,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2255));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 18,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2261));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 19,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2262));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 20,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2263));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 21,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2264));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 22,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2265));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 23,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2266));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 24,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2266));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 25,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2267));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 26,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2308));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 27,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2310));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 28,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2311));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 29,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2312));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 30,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2313));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 31,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2314));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 32,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2315));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 33,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2316));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 34,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2318));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 35,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2318));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 36,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2319));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 37,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2320));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 38,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2321));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 39,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2322));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 40,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2323));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 41,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2324));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 42,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2325));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 43,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2326));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 100,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2460));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 101,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2462));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 102,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2463));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 103,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2464));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 104,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2465));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 105,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2468));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 106,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2469));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 107,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2470));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 108,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2471));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1000,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2417));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1001,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2421));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1002,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2422));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1003,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2423));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1004,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2424));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1005,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 28, 16, 14, 45, 72, DateTimeKind.Utc).AddTicks(2427));

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_TestSessionId",
                table: "UserAnswers",
                column: "TestSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_TestSessions_TestSessionId",
                table: "UserAnswers",
                column: "TestSessionId",
                principalTable: "TestSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_TestSessions_TestSessionId",
                table: "UserAnswers");

            migrationBuilder.DropTable(
                name: "TestSessions");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswers_TestSessionId",
                table: "UserAnswers");

            migrationBuilder.DropColumn(
                name: "TestSessionId",
                table: "UserAnswers");

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2262));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2266));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2267));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2268));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2269));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2270));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2271));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 8,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2272));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 9,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2273));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 10,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2274));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 11,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2275));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 12,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2276));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 107,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2317));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 108,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2318));

            migrationBuilder.UpdateData(
                table: "AnswerOptions",
                keyColumn: "Id",
                keyValue: 109,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2319));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1824));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1830));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1831));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1832));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1833));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1834));

            migrationBuilder.UpdateData(
                table: "Disciplines",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1835));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2234));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2238));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2240));

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2301));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1983));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1993));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1994));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1995));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1996));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1999));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1999));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 8,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2000));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 9,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2001));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 10,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2005));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 11,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2006));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 12,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2008));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 13,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2008));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 14,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2009));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 15,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2010));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 16,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2011));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 17,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2012));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 18,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2019));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 19,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2020));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 20,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2021));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 21,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2022));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 22,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2023));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 23,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2023));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 24,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2024));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 25,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2025));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 26,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2026));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 27,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2027));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 28,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2027));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 29,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2028));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 30,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2029));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 31,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2030));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 32,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2031));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 33,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2031));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 34,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2033));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 35,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2034));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 36,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2035));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 37,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2035));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 38,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2036));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 39,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2037));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 40,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2038));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 41,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2039));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 42,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2039));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 43,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2040));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 100,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2194));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 101,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2195));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 102,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2196));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 103,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2198));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 104,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2200));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 105,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2202));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 106,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2203));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 107,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2204));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 108,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2205));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1000,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2155));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1001,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2159));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1002,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2160));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1003,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2160));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1004,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2161));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1005,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2164));
        }
    }
}
