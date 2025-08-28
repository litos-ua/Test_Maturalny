using TestMaturalnyApp.Data;
using TestMaturalnyApp.Infrastructure.Logging;
using Microsoft.EntityFrameworkCore;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Repositories;
using TestMaturalnyApp.Data.Repositories.Admin;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Services.Interfaces.Auth;
using TestMaturalnyApp.Services.Services;
using TestMaturalnyApp.Services.Services.Admin;
using TestMaturalnyApp.Services.Services.Auth;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TestMaturalnyApp.API.Middleware;
using TestMaturalnyApp.API.Extensions;
using TestMaturalnyApp.Data.Interfaces.Admin;



var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("https://localhost:7283", "http://localhost:5000",
                         "https://192.168.43.91:7283", "http://192.168.43.91:5000", "http://0.0.0.0:5283"
                         );


// Add extension JSON-config
builder.Configuration.AddJsonFile("Config/serverconfig.json", optional: true, reloadOnChange: true);

// Configure CORS
var corsPolicyTestMaturalny = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyTestMaturalny, policy =>
    {
        policy.WithOrigins("http://localhost:3000",
                           "http://192.168.0.33:3000",
                           "http://localhost:5173",
                           "https://localhost:5173",
                           "http://192.168.0.33:5173",
                           "https://192.168.0.33:5173",
                           "http://192.168.43.91:5173",
                           "https://192.168.43.91:5173",
                           "http://192.168.43.220:5173",
                           "https://192.168.43.220:5173")                         // Allow only your frontend

        //policy.AllowAnyOrigin() // Allows requests from any sites
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials() // If cookies or credentials are used
              .WithExposedHeaders("X-Total-Count");
    });
});


//// Configure CORS
//var corsPolicyTestMaturalny = "AllowFrontend";
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(corsPolicyTestMaturalny, policy =>
//    {
//        policy
//            .SetIsOriginAllowed(origin =>
//            {
//                if (Uri.TryCreate(origin, UriKind.Absolute, out var uri))
//                {
//                    // Разрешаем localhost на любом порту
//                    if (uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase))
//                        return true;

//                    // Разрешаем https://localhost на любом порту
//                    if (uri.Host.Equals("127.0.0.1"))
//                        return true;

//                    // Разрешаем только 192.168.*.* и только порт 5173
//                    if (uri.Host.StartsWith("192.168.", StringComparison.OrdinalIgnoreCase) && uri.Port == 5173)
//                        return true;
//                }
//                return false;
//            })
//            .AllowAnyHeader()
//            .AllowAnyMethod()
//            .AllowCredentials()
//            .WithExposedHeaders("X-Total-Count");
//    });
//});



// Явное указание Kestrel, какие адреса слушать
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5000); // HTTP
    serverOptions.ListenAnyIP(7283, listenOptions => // HTTPS
    {
        listenOptions.UseHttps();
    });
});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());

// Configure JSON options
//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
//    });

// Кеширование
builder.Services.AddMemoryCache();


builder.Services.AddAuthorization();


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Получение UserId из текущего контекста
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();


// Configure dependency injection
builder.Services.AddScoped<IDisciplineRepository, DisciplineRepository>();
builder.Services.AddScoped<IDisciplineAdminRepository, DisciplineRepository>();
builder.Services.AddScoped<IDisciplineService, DisciplineService>();
builder.Services.AddScoped<IDisciplineAdminService, DisciplineService>();

builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<ITopicAdminRepository, TopicRepository>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<ITopicAdminService, TopicService>();

builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IQuestionAdminRepository, QuestionRepository>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IQuestionAdminService, QuestionService>();

builder.Services.AddScoped<IAnswerOptionAdminRepository, AnswerOptionAdminRepository>();
builder.Services.AddScoped<IAnswerOptionAdminService, AnswerOptionAdminService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserAdminRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserAdminService, UserService>();

builder.Services.AddScoped<IUserTokenRepository, UserTokenRepository>();
builder.Services.AddScoped<IUserTokenService, UserTokenService>();

builder.Services.AddScoped<ITestSessionRepository, TestSessionRepository>();
builder.Services.AddScoped<ITestSessionService, TestSessionService>();
builder.Services.AddScoped<IUserAnswerRepository, UserAnswerRepository>();
builder.Services.AddScoped<IUserAnswerService, UserAnswerService>();
builder.Services.AddScoped<IUserOptionService, UserOptionService>();
builder.Services.AddScoped<IUserOptionRepository, UserOptionRepository>();
builder.Services.AddScoped<ITestEvaluationService, TestEvaluationService>();
builder.Services.AddScoped<ITestStatisticsService, TestStatisticsService>();
builder.Services.AddScoped<ITestExportService, TestExportService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<TestMaturalnyApp.Services.Interfaces.Auth.IAuthService, TestMaturalnyApp.Services.Services.Auth.AuthService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();




// Configure JWT authentication
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrEmpty(jwtKey)) throw new Exception("JWT key is missing in configuration");

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
{
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            ValidateIssuer = false, // при необходимости включить true
            ValidateAudience = false, // при необходимости включить true
            ValidateLifetime = true,

            ClockSkew = TimeSpan.Zero
        };
});

builder.Services.AddAuthorization();

// Сервис для работы Swagger с JWT
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "TestMaturalnyApp API", Version = "v1" });

    var securityScheme = new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
    };

    var securityRequirement = new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            securityScheme,
            Array.Empty<string>()
        }
    };

    c.AddSecurityDefinition("Bearer", securityScheme);
    c.AddSecurityRequirement(securityRequirement);
});




// Configure logging
var logPathTemplate = builder.Configuration["Logging:File:Path"] ?? "logs/app-{Date}";
var logPath = logPathTemplate.Replace("{Date}", DateTime.Today.ToString("yyyyMMdd")); //Обработка {Date}: Ручная замена плейсхолдера на дату
var logDirectory = Path.GetDirectoryName(logPath);

if (!Directory.Exists(logDirectory))
{
    Directory.CreateDirectory(logDirectory!);
}

builder.Logging.ClearProviders(); // Optional: remove default providers
builder.Logging.AddProvider(new FileLoggerProvider(logPath));




var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Custom exception handling middleware
app.UseMiddleware<ExceptionMiddleware>();

// Global Error Handler
app.UseGlobalErrorHandling();

// Enable CORS
app.UseCors(corsPolicyTestMaturalny);

//app.UseHttpsRedirection(); 

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
