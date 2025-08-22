//using Microsoft.EntityFrameworkCore;
//using TestMaturalnyApp.Data.Entities;

//namespace TestMaturalnyApp.Data
//{
//    public class AppDbContext : DbContext
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

//        public DbSet<Discipline> Disciplines => Set<Discipline>();
//        public DbSet<Topic> Topics => Set<Topic>();
//        public DbSet<Question> Questions => Set<Question>();
//        public DbSet<AnswerOption> AnswerOptions => Set<AnswerOption>();
//        public DbSet<UserAnswer> UserAnswers => Set<UserAnswer>();
//        public DbSet<UserAnswerOption> UserAnswerOptions => Set<UserAnswerOption>();

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
//        }
//    }
//}


using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Entities;
using TestMaturalnyApp.Data.SeedData;


namespace TestMaturalnyApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Discipline> Disciplines => Set<Discipline>();
    public DbSet<Topic> Topics => Set<Topic>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<AnswerOption> AnswerOptions => Set<AnswerOption>();
    public DbSet<UserAnswer> UserAnswers => Set<UserAnswer>();
    public DbSet<UserAnswerOption> UserAnswerOptions => Set<UserAnswerOption>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserToken> UserTokens => Set<UserToken>();
    public DbSet<UserOption> UserOption => Set<UserOption>();
    public DbSet<TestSession> TestSessions => Set<TestSession>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // Вызов сидера
        DbSeeder.Seed(modelBuilder);
    }
}

