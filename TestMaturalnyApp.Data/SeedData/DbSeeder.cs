using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Data.SeedData
{
    public static class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
        //    // Seed Disciplines
        //    modelBuilder.Entity<Discipline>().HasData(
        //        new Discipline { Id = 1, Name = "Історія України" },
        //        new Discipline { Id = 2, Name = "Математика" },
        //        new Discipline { Id = 3, Name = "Інформатика" },
        //        new Discipline { Id = 4, Name = "Фізика" },
        //        new Discipline { Id = 5, Name = "Англійська мова" },
        //        new Discipline { Id = 6, Name = "Українська мова" },
        //        new Discipline { Id = 7, Name = "Польська мова" }
        //    );

        //    // Seed Topics for Історія України
        //    var historyTopics = new[]
        //    {
        //        "Вступ до історії України.",
        //        "Стародавня історія України.",
        //        "Русь-Україна (Київська держава).",
        //        "Королівство Руське (Галицько-Волинська держава). Монгольська навала.",
        //        "Руські удільні князівства у складі іноземних держав у др.п. XIV – п.п. XVI ст. Кримське ханство.",
        //        "Українські землі у складі Речі Посполитої у др.п. XVI ст.",
        //        "Українські землі у складі Речі Посполитої в п.п. XVII ст.",
        //        "Національно-визвольна війна українського народу середини XVII ст.",
        //        "Козацька Україна наприкінці 50-80-х рр. XVII ст.",
        //        "Українські землі наприкінці XVII – в п.п. XVIII ст.",
        //        "Українські землі в др.п. XVIII ст.",
        //        "Українські землі у складі Російської імперії наприкінці XVIII – в п.п. ХІХ ст.",
        //        "Українські землі у складі Австрійської імперії наприкінці XVIII – в п.п. ХІХ ст.",
        //        "Культура України кінця XVIII – п.п. ХІХ ст.",
        //        "Українські землі у складі Російської імперії в др.п ХІХ ст.",
        //        "Українські землі у складі Австро-Угорщини в др.п. ХІХ ст.",
        //        "Культура України в др.п. ХІХ – на початку ХХ ст.",
        //        "Українські землі у складі Російської імперії в 1900-1914 рр.",
        //        "Українські землі у складі Австро-Угорщини в 1900-1914 рр.",
        //        "Україна в роки Першої світової війни.",
        //        "Початок Української революції.",
        //        "Розгортання Української революції.",
        //        "Встановлення комуністичного тоталітарного режиму в Україні.",
        //        "Утвердження більшовицького тоталітарного режиму в Україні.",
        //        "Західноукраїнські землі в міжвоєнний період.",
        //        "Україна в роки Другої світової війни.",
        //        "Україна в перші повоєнні роки.",
        //        "Україна в умовах десталінізації.",
        //        "Україна в період загострення кризи радянської системи.",
        //        "Відновлення незалежності України.",
        //        "Становлення України як незалежної держави.",
        //        "Творення нової України.",
        //        "Персоналії",
        //        "Діячі культури освіти і науки.",
        //        "Громадсько-політичні та військові діячі.",
        //        "Архітектура культових споруд в Україні.",
        //        "Архітектура фортифікаційних споруд в Україні.",
        //        "Світська архітектура. Містобудування.",
        //        "Скульптура. Пам’ятники.",
        //        "Ікони (Образотворче мистецтво).",
        //        "Мініатюри. Гравюри. Портрети.",
        //        "Художні роботи (образотворче мистецтво).",
        //        "Пам’ятки стародавньої історії України.",
        //};

        //    int historytopicId = 1;
        //    int historydisciplineId = 1;
        //    var historyseededTopics = historyTopics.Select((title, index) => new Topic
        //    {
        //        Id = historytopicId + index,
        //        Title = title,
        //        Description = title,
        //        Level = LevelType.Standard,
        //        DisciplineId = historydisciplineId
        //    }).ToArray();

        //    modelBuilder.Entity<Topic>().HasData(historyseededTopics);

        //    // Seed Topics for Математика
        //    var mathTopics = new[]
        //    {
        //        "Числа і вирази",
        //        "Рівняння, нерівності і їх системи",
        //        "Функції",
        //        "Елементи комбінаторики, початки теорії ймовірностей та елементи математичної статистики",
        //        "Планіметрія",
        //        "Стереометрія",
        //    };
        //    int mathtopicId = 1000;
        //    int mathdisciplineId = 3;
        //    var mathseededTopics = mathTopics.Select((title, index) => new Topic
        //    {
        //        Id = mathtopicId + index,
        //        Title = title,
        //        Description = title,
        //        Level = LevelType.Standard,
        //        DisciplineId = mathdisciplineId
        //    }).ToArray();


        //    modelBuilder.Entity<Topic>().HasData(mathseededTopics);

        //    // Seed Topics for other disciplines (3 each)
        //    modelBuilder.Entity<Topic>().HasData(
        //        new Topic { Id = 100, Title = "Числа і дії з ними", Description = "Числа і дії з ними", Level = LevelType.Standard, DisciplineId = 2 },
        //        new Topic { Id = 101, Title = "Алгебра", Description = "Алгебра", Level = LevelType.Standard, DisciplineId = 2 },
        //        new Topic { Id = 102, Title = "Геометрія", Description = "Геометрія", Level = LevelType.Standard, DisciplineId = 2 },
        //        new Topic { Id = 103, Title = "Бази даних", Description = "Бази даних", Level = LevelType.Standard, DisciplineId = 3 },
        //        new Topic { Id = 104, Title = "Мережі", Description = "Мережі", Level = LevelType.Standard, DisciplineId = 3 },
        //        new Topic { Id = 105, Title = "Алгоритми", Description = "Алгоритми", Level = LevelType.Standard, DisciplineId = 3 },
        //        new Topic { Id = 106, Title = "Механіка", Description = "Механіка", Level = LevelType.Standard, DisciplineId = 4 },
        //        new Topic { Id = 107, Title = "Оптика", Description = "Оптика", Level = LevelType.Standard, DisciplineId = 4 },
        //        new Topic { Id = 108, Title = "Електрика", Description = "Електрика", Level = LevelType.Standard, DisciplineId = 4 }
        //    );

        //    // Seed a couple of Questions for Історія України
        //    modelBuilder.Entity<Question>().HasData(
        //        new Question
        //        {
        //            Id = 1,
        //            Text = "Коли відбулося хрещення Русі?",
        //            TopicId = 3,
        //            Type = QuestionType.SingleChoice,
        //            MaxScore = 1.0
        //        },
        //        new Question
        //        {
        //            Id = 2,
        //            Text = "Яке місто стало столицею Київської Русі?",
        //            TopicId = 3,
        //            Type = QuestionType.SingleChoice,
        //            MaxScore = 1.0
        //        },
        //        new Question
        //        {
        //            Id = 3,
        //            Text = "У 1238 р. під Дорогичином військо князя Данила Галицького завдало поразки?",
        //            TopicId = 4,
        //            Type = QuestionType.SingleChoice,
        //            MaxScore = 2.0
        //        }

        //    );

        //    modelBuilder.Entity<AnswerOption>().HasData(
        //        new AnswerOption { Id = 1, Text = "988 рік", IsCorrect = true, QuestionId = 1 },
        //        new AnswerOption { Id = 2, Text = "1054 рік", IsCorrect = false, QuestionId = 1 },
        //        new AnswerOption { Id = 3, Text = "1240 рік", IsCorrect = false, QuestionId = 1 },
        //        new AnswerOption { Id = 4, Text = "1265 рік", IsCorrect = false, QuestionId = 1 },

        //        new AnswerOption { Id = 5, Text = "Київ", IsCorrect = true, QuestionId = 2 },
        //        new AnswerOption { Id = 6, Text = "Чернігів", IsCorrect = false, QuestionId = 2 },
        //        new AnswerOption { Id = 7, Text = "Львів", IsCorrect = false, QuestionId = 2 },
        //        new AnswerOption { Id = 8, Text = "Переяслав", IsCorrect = false, QuestionId = 2 },

        //        new AnswerOption { Id = 9, Text = "монголам", IsCorrect = true, QuestionId = 3 },
        //        new AnswerOption { Id = 10, Text = "угорцям", IsCorrect = false, QuestionId = 3 },
        //        new AnswerOption { Id = 11, Text = "полякам", IsCorrect = false, QuestionId = 3 },
        //        new AnswerOption { Id = 12, Text = "хрестоносцям", IsCorrect = true, QuestionId = 3 }
        //    );

        //    // Seed questions for Математика
        //    modelBuilder.Entity<Question>().HasData(
        //        new Question
        //        {
        //            Id = 4,
        //            Text = "Скільки буде 7 + 5?",
        //            TopicId = 100,
        //            Type = QuestionType.SingleChoice,
        //            MaxScore = 1.0
        //        }
        //    );

        //    modelBuilder.Entity<AnswerOption>().HasData(
        //        new AnswerOption { Id = 107, Text = "12", IsCorrect = true, QuestionId = 3 },
        //        new AnswerOption { Id = 108, Text = "10", IsCorrect = false, QuestionId = 3 },
        //        new AnswerOption { Id = 109, Text = "13", IsCorrect = false, QuestionId = 3 }
        //    );
        }
    }
}
