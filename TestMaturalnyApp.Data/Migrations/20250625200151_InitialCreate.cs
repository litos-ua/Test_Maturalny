using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TestMaturalnyApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Disciplines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disciplines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Role = table.Column<int>(type: "int", nullable: false),
                    EmailVerified = table.Column<bool>(type: "bit", nullable: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    LockoutEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PasswordResetToken = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    PasswordResetExpires = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(700)", maxLength: 700, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DisciplineId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Topics_Disciplines_DisciplineId",
                        column: x => x.DisciplineId,
                        principalTable: "Disciplines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserToken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    CreatedByIp = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true),
                    RevokedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevokedByIp = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserToken_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(700)", maxLength: 700, nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    MaxScore = table.Column<double>(type: "float(4)", precision: 4, scale: 2, nullable: false, defaultValue: 0.0),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TopicId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnswerOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    Explanation = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    GroupKey = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MatchLabel = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerOptions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    Explanation = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Score = table.Column<double>(type: "float(4)", precision: 4, scale: 2, nullable: false, defaultValue: 0.0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAnswers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAnswers_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswerOptions",
                columns: table => new
                {
                    UserAnswerId = table.Column<int>(type: "int", nullable: false),
                    AnswerOptionId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswerOptions", x => new { x.UserAnswerId, x.AnswerOptionId });
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

            migrationBuilder.InsertData(
                table: "Disciplines",
                columns: new[] { "Id", "CreatedAt", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1824), "Історія України", null },
                    { 2, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1830), "Математика", null },
                    { 3, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1831), "Інформатика", null },
                    { 4, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1832), "Фізика", null },
                    { 5, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1833), "Англійська мова", null },
                    { 6, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1834), "Українська мова", null },
                    { 7, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1835), "Польська мова", null }
                });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "CreatedAt", "Description", "DisciplineId", "Level", "Title", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1983), "Вступ до історії України.", 1, 0, "Вступ до історії України.", null },
                    { 2, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1993), "Стародавня історія України.", 1, 0, "Стародавня історія України.", null },
                    { 3, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1994), "Русь-Україна (Київська держава).", 1, 0, "Русь-Україна (Київська держава).", null },
                    { 4, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1995), "Королівство Руське (Галицько-Волинська держава). Монгольська навала.", 1, 0, "Королівство Руське (Галицько-Волинська держава). Монгольська навала.", null },
                    { 5, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1996), "Руські удільні князівства у складі іноземних держав у др.п. XIV – п.п. XVI ст. Кримське ханство.", 1, 0, "Руські удільні князівства у складі іноземних держав у др.п. XIV – п.п. XVI ст. Кримське ханство.", null },
                    { 6, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1999), "Українські землі у складі Речі Посполитої у др.п. XVI ст.", 1, 0, "Українські землі у складі Речі Посполитої у др.п. XVI ст.", null },
                    { 7, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(1999), "Українські землі у складі Речі Посполитої в п.п. XVII ст.", 1, 0, "Українські землі у складі Речі Посполитої в п.п. XVII ст.", null },
                    { 8, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2000), "Національно-визвольна війна українського народу середини XVII ст.", 1, 0, "Національно-визвольна війна українського народу середини XVII ст.", null },
                    { 9, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2001), "Козацька Україна наприкінці 50-80-х рр. XVII ст.", 1, 0, "Козацька Україна наприкінці 50-80-х рр. XVII ст.", null },
                    { 10, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2005), "Українські землі наприкінці XVII – в п.п. XVIII ст.", 1, 0, "Українські землі наприкінці XVII – в п.п. XVIII ст.", null },
                    { 11, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2006), "Українські землі в др.п. XVIII ст.", 1, 0, "Українські землі в др.п. XVIII ст.", null },
                    { 12, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2008), "Українські землі у складі Російської імперії наприкінці XVIII – в п.п. ХІХ ст.", 1, 0, "Українські землі у складі Російської імперії наприкінці XVIII – в п.п. ХІХ ст.", null },
                    { 13, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2008), "Українські землі у складі Австрійської імперії наприкінці XVIII – в п.п. ХІХ ст.", 1, 0, "Українські землі у складі Австрійської імперії наприкінці XVIII – в п.п. ХІХ ст.", null },
                    { 14, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2009), "Культура України кінця XVIII – п.п. ХІХ ст.", 1, 0, "Культура України кінця XVIII – п.п. ХІХ ст.", null },
                    { 15, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2010), "Українські землі у складі Російської імперії в др.п ХІХ ст.", 1, 0, "Українські землі у складі Російської імперії в др.п ХІХ ст.", null },
                    { 16, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2011), "Українські землі у складі Австро-Угорщини в др.п. ХІХ ст.", 1, 0, "Українські землі у складі Австро-Угорщини в др.п. ХІХ ст.", null },
                    { 17, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2012), "Культура України в др.п. ХІХ – на початку ХХ ст.", 1, 0, "Культура України в др.п. ХІХ – на початку ХХ ст.", null },
                    { 18, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2019), "Українські землі у складі Російської імперії в 1900-1914 рр.", 1, 0, "Українські землі у складі Російської імперії в 1900-1914 рр.", null },
                    { 19, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2020), "Українські землі у складі Австро-Угорщини в 1900-1914 рр.", 1, 0, "Українські землі у складі Австро-Угорщини в 1900-1914 рр.", null },
                    { 20, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2021), "Україна в роки Першої світової війни.", 1, 0, "Україна в роки Першої світової війни.", null },
                    { 21, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2022), "Початок Української революції.", 1, 0, "Початок Української революції.", null },
                    { 22, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2023), "Розгортання Української революції.", 1, 0, "Розгортання Української революції.", null },
                    { 23, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2023), "Встановлення комуністичного тоталітарного режиму в Україні.", 1, 0, "Встановлення комуністичного тоталітарного режиму в Україні.", null },
                    { 24, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2024), "Утвердження більшовицького тоталітарного режиму в Україні.", 1, 0, "Утвердження більшовицького тоталітарного режиму в Україні.", null },
                    { 25, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2025), "Західноукраїнські землі в міжвоєнний період.", 1, 0, "Західноукраїнські землі в міжвоєнний період.", null },
                    { 26, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2026), "Україна в роки Другої світової війни.", 1, 0, "Україна в роки Другої світової війни.", null },
                    { 27, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2027), "Україна в перші повоєнні роки.", 1, 0, "Україна в перші повоєнні роки.", null },
                    { 28, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2027), "Україна в умовах десталінізації.", 1, 0, "Україна в умовах десталінізації.", null },
                    { 29, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2028), "Україна в період загострення кризи радянської системи.", 1, 0, "Україна в період загострення кризи радянської системи.", null },
                    { 30, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2029), "Відновлення незалежності України.", 1, 0, "Відновлення незалежності України.", null },
                    { 31, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2030), "Становлення України як незалежної держави.", 1, 0, "Становлення України як незалежної держави.", null },
                    { 32, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2031), "Творення нової України.", 1, 0, "Творення нової України.", null },
                    { 33, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2031), "Персоналії", 1, 0, "Персоналії", null },
                    { 34, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2033), "Діячі культури освіти і науки.", 1, 0, "Діячі культури освіти і науки.", null },
                    { 35, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2034), "Громадсько-політичні та військові діячі.", 1, 0, "Громадсько-політичні та військові діячі.", null },
                    { 36, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2035), "Архітектура культових споруд в Україні.", 1, 0, "Архітектура культових споруд в Україні.", null },
                    { 37, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2035), "Архітектура фортифікаційних споруд в Україні.", 1, 0, "Архітектура фортифікаційних споруд в Україні.", null },
                    { 38, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2036), "Світська архітектура. Містобудування.", 1, 0, "Світська архітектура. Містобудування.", null },
                    { 39, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2037), "Скульптура. Пам’ятники.", 1, 0, "Скульптура. Пам’ятники.", null },
                    { 40, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2038), "Ікони (Образотворче мистецтво).", 1, 0, "Ікони (Образотворче мистецтво).", null },
                    { 41, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2039), "Мініатюри. Гравюри. Портрети.", 1, 0, "Мініатюри. Гравюри. Портрети.", null },
                    { 42, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2039), "Художні роботи (образотворче мистецтво).", 1, 0, "Художні роботи (образотворче мистецтво).", null },
                    { 43, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2040), "Пам’ятки стародавньої історії України.", 1, 0, "Пам’ятки стародавньої історії України.", null },
                    { 100, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2194), "Числа і дії з ними", 2, 0, "Числа і дії з ними", null },
                    { 101, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2195), "Алгебра", 2, 0, "Алгебра", null },
                    { 102, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2196), "Геометрія", 2, 0, "Геометрія", null },
                    { 103, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2198), "Бази даних", 3, 0, "Бази даних", null },
                    { 104, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2200), "Мережі", 3, 0, "Мережі", null },
                    { 105, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2202), "Алгоритми", 3, 0, "Алгоритми", null },
                    { 106, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2203), "Механіка", 4, 0, "Механіка", null },
                    { 107, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2204), "Оптика", 4, 0, "Оптика", null },
                    { 108, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2205), "Електрика", 4, 0, "Електрика", null },
                    { 1000, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2155), "Числа і вирази", 3, 0, "Числа і вирази", null },
                    { 1001, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2159), "Рівняння, нерівності і їх системи", 3, 0, "Рівняння, нерівності і їх системи", null },
                    { 1002, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2160), "Функції", 3, 0, "Функції", null },
                    { 1003, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2160), "Елементи комбінаторики, початки теорії ймовірностей та елементи математичної статистики", 3, 0, "Елементи комбінаторики, початки теорії ймовірностей та елементи математичної статистики", null },
                    { 1004, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2161), "Планіметрія", 3, 0, "Планіметрія", null },
                    { 1005, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2164), "Стереометрія", 3, 0, "Стереометрія", null }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CreatedAt", "ImageUrl", "MaxScore", "Text", "TopicId", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2234), null, 1.0, "Коли відбулося хрещення Русі?", 3, 0, null },
                    { 2, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2238), null, 1.0, "Яке місто стало столицею Київської Русі?", 3, 0, null },
                    { 3, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2240), null, 2.0, "У 1238 р. під Дорогичином військо князя Данила Галицького завдало поразки?", 4, 0, null },
                    { 4, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2301), null, 1.0, "Скільки буде 7 + 5?", 100, 0, null }
                });

            migrationBuilder.InsertData(
                table: "AnswerOptions",
                columns: new[] { "Id", "CreatedAt", "Explanation", "GroupKey", "IsCorrect", "MatchLabel", "QuestionId", "Text", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2262), null, null, true, null, 1, "988 рік", null },
                    { 2, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2266), null, null, false, null, 1, "1054 рік", null },
                    { 3, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2267), null, null, false, null, 1, "1240 рік", null },
                    { 4, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2268), null, null, false, null, 1, "1265 рік", null },
                    { 5, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2269), null, null, true, null, 2, "Київ", null },
                    { 6, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2270), null, null, false, null, 2, "Чернігів", null },
                    { 7, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2271), null, null, false, null, 2, "Львів", null },
                    { 8, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2272), null, null, false, null, 2, "Переяслав", null },
                    { 9, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2273), null, null, true, null, 3, "монголам", null },
                    { 10, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2274), null, null, false, null, 3, "угорцям", null },
                    { 11, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2275), null, null, false, null, 3, "полякам", null },
                    { 12, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2276), null, null, true, null, 3, "хрестоносцям", null },
                    { 107, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2317), null, null, true, null, 3, "12", null },
                    { 108, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2318), null, null, false, null, 3, "10", null },
                    { 109, new DateTime(2025, 6, 25, 20, 1, 50, 632, DateTimeKind.Utc).AddTicks(2319), null, null, false, null, 3, "13", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnswerOptions_QuestionId",
                table: "AnswerOptions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_TopicId",
                table: "Questions",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_DisciplineId",
                table: "Topics",
                column: "DisciplineId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswerOptions_AnswerOptionId",
                table: "UserAnswerOptions",
                column: "AnswerOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_QuestionId",
                table: "UserAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_UserId",
                table: "UserAnswers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserToken_UserId",
                table: "UserToken",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAnswerOptions");

            migrationBuilder.DropTable(
                name: "UserToken");

            migrationBuilder.DropTable(
                name: "AnswerOptions");

            migrationBuilder.DropTable(
                name: "UserAnswers");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropTable(
                name: "Disciplines");
        }
    }
}
