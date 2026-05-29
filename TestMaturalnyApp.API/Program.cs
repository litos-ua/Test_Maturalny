//using TestMaturalnyApp.Data;
//using TestMaturalnyApp.Infrastructure.Logging;
//using Microsoft.EntityFrameworkCore;
//using TestMaturalnyApp.Data.Interfaces;
//using TestMaturalnyApp.Data.Repositories;
//using TestMaturalnyApp.Data.Repositories.Admin;
//using TestMaturalnyApp.Services.Interfaces;
//using TestMaturalnyApp.Services.Interfaces.Admin;
//using TestMaturalnyApp.Services.Interfaces.Auth;
//using TestMaturalnyApp.Services.Services;
//using TestMaturalnyApp.Services.Services.Admin;
//using TestMaturalnyApp.Services.Services.Auth;
//using System.Text.Json.Serialization;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using TestMaturalnyApp.API.Middleware;
//using TestMaturalnyApp.API.Extensions;
//using TestMaturalnyApp.Data.Interfaces.Admin;



//var builder = WebApplication.CreateBuilder(args);

//builder.WebHost.UseUrls("https://localhost:7283", "http://localhost:5000",
//                         "https://192.168.43.91:7283", "http://192.168.43.91:5000", "http://0.0.0.0:5283"
//                         );


//// Add extension JSON-config
//builder.Configuration.AddJsonFile("Config/serverconfig.json", optional: true, reloadOnChange: true);

//// Configure CORS
//var corsPolicyTestMaturalny = "AllowFrontend";
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(corsPolicyTestMaturalny, policy =>
//    {
//        policy.WithOrigins("http://localhost:3000",
//                           "http://192.168.0.33:3000",
//                           "http://localhost:5173",
//                           "https://localhost:5173",
//                           "http://192.168.0.33:5173",
//                           "https://192.168.0.33:5173",
//                           "http://192.168.43.91:5173",
//                           "https://192.168.43.91:5173",
//                           "http://192.168.43.220:5173",
//                           "https://192.168.43.220:5173",
//                           "http://192.168.0.3:81",
//                           "https://192.168.0.3")                         

//        //policy.AllowAnyOrigin() // Allows requests from any sites
//              .AllowAnyHeader()
//              .AllowAnyMethod()
//              .AllowCredentials() // If cookies or credentials are used
//              .WithExposedHeaders("X-Total-Count");
//    });
//});



//// Явное указание Kestrel, какие адреса слушать
//builder.WebHost.ConfigureKestrel(serverOptions =>
//{
//    serverOptions.ListenAnyIP(5000); // HTTP
//    serverOptions.ListenAnyIP(7283, listenOptions => // HTTPS (при публикации на сервер закомментировать)
//    {
//        listenOptions.UseHttps();
//    });
//});



//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Configure database context
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());

//// Кеширование
//builder.Services.AddMemoryCache();


//builder.Services.AddAuthorization();


//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//    });

//// Получение UserId из текущего контекста
//builder.Services.AddHttpContextAccessor();
//builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();


//// Configure dependency injection
//builder.Services.AddScoped<IDisciplineRepository, DisciplineRepository>();
//builder.Services.AddScoped<IDisciplineAdminRepository, DisciplineRepository>();
//builder.Services.AddScoped<IDisciplineService, DisciplineService>();
//builder.Services.AddScoped<IDisciplineAdminService, DisciplineService>();

//builder.Services.AddScoped<ITopicRepository, TopicRepository>();
//builder.Services.AddScoped<ITopicAdminRepository, TopicRepository>();
//builder.Services.AddScoped<ITopicService, TopicService>();
//builder.Services.AddScoped<ITopicAdminService, TopicService>();

//builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
//builder.Services.AddScoped<IQuestionAdminRepository, QuestionRepository>();
//builder.Services.AddScoped<IQuestionService, QuestionService>();
//builder.Services.AddScoped<IQuestionAdminService, QuestionService>();

//builder.Services.AddScoped<IAnswerOptionAdminRepository, AnswerOptionAdminRepository>();
//builder.Services.AddScoped<IAnswerOptionAdminService, AnswerOptionAdminService>();

//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<IUserAdminRepository, UserRepository>();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IUserAdminService, UserService>();

//builder.Services.AddScoped<IUserTokenRepository, UserTokenRepository>();
//builder.Services.AddScoped<IUserTokenService, UserTokenService>();

//builder.Services.AddScoped<ITestSessionRepository, TestSessionRepository>();
//builder.Services.AddScoped<ITestSessionService, TestSessionService>();

//builder.Services.AddScoped<IUserAnswerRepository, UserAnswerRepository>();
//builder.Services.AddScoped<IUserAnswerService, UserAnswerService>();

//builder.Services.AddScoped<IUserOptionService, UserOptionService>();
//builder.Services.AddScoped<IUserOptionRepository, UserOptionRepository>();

//builder.Services.AddScoped<ITestEvaluationService, TestEvaluationService>();
//builder.Services.AddScoped<ITestStatisticsService, TestStatisticsService>();

//builder.Services.AddScoped<ITestExportService, TestExportService>();

//builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

//builder.Services.AddScoped<IMessageRepository, MessageRepository>();
//builder.Services.AddScoped<IMessageService, MessageService>();




//// Configure JWT authentication
//var jwtKey = builder.Configuration["Jwt:Key"];
//var jwtIssuer = builder.Configuration["Jwt:Issuer"];
//var jwtAudience = builder.Configuration["Jwt:Audience"];

//if (string.IsNullOrEmpty(jwtKey)) throw new Exception("JWT key is missing in configuration");

//builder.Services.AddAuthentication(options =>
//    {
//        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    })
//    .AddJwtBearer(options =>
//{
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
//            ValidIssuer = jwtIssuer,
//            ValidAudience = jwtAudience,
//            ValidateIssuer = false, // при необходимости включить true
//            ValidateAudience = false, // при необходимости включить true
//            ValidateLifetime = true,

//            ClockSkew = TimeSpan.Zero
//        };
//});

//builder.Services.AddAuthorization();

//// Сервис для работы Swagger с JWT
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "TestMaturalnyApp API", Version = "v1" });

//    var securityScheme = new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//    {
//        Name = "Authorization",
//        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
//        Scheme = "bearer",
//        BearerFormat = "JWT",
//        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
//    };

//    var securityRequirement = new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
//    {
//        {
//            securityScheme,
//            Array.Empty<string>()
//        }
//    };

//    c.AddSecurityDefinition("Bearer", securityScheme);
//    c.AddSecurityRequirement(securityRequirement);
//});




//// Configure logging
//var logPathTemplate = builder.Configuration["Logging:File:Path"] ?? "logs/app-{Date}";
//var logPath = logPathTemplate.Replace("{Date}", DateTime.Today.ToString("yyyyMMdd")); //Обработка {Date}: Ручная замена плейсхолдера на дату
//var logDirectory = Path.GetDirectoryName(logPath);

//if (!Directory.Exists(logDirectory))
//{
//    Directory.CreateDirectory(logDirectory!);
//}

//builder.Logging.ClearProviders(); // Optional: remove default providers
//builder.Logging.AddProvider(new FileLoggerProvider(logPath));




//var app = builder.Build();


//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}


//// Custom exception handling middleware
//app.UseMiddleware<ExceptionMiddleware>();

//// Global Error Handler
//app.UseGlobalErrorHandling();

//// Enable CORS
//app.UseCors(corsPolicyTestMaturalny);

////app.UseHttpsRedirection(); 

//// Enable authentication and authorization
//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();

//app.Run();






using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using TestMaturalnyApp.API.Extensions;
using TestMaturalnyApp.API.Middleware;
using TestMaturalnyApp.Data;
using TestMaturalnyApp.Data.Interfaces;
using TestMaturalnyApp.Data.Interfaces.Admin;
using TestMaturalnyApp.Data.Repositories;
using TestMaturalnyApp.Data.Repositories.Admin;
using TestMaturalnyApp.Infrastructure.Logging;
using TestMaturalnyApp.Services.Interfaces;
using TestMaturalnyApp.Services.Interfaces.Admin;
using TestMaturalnyApp.Services.Interfaces.AI;
using TestMaturalnyApp.Services.Interfaces.Auth;
using TestMaturalnyApp.Services.Services;
using TestMaturalnyApp.Services.Services.Admin;
using TestMaturalnyApp.Services.Services.AI;
using TestMaturalnyApp.Services.Services.AI.Providers;
using TestMaturalnyApp.Services.Services.Auth;



var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("https://localhost:7283",
                        "http://localhost:5000",
                         "https://192.168.43.91:7283",
                         "http://192.168.43.91:5000",
                         "http://0.0.0.0:5283"
                         );


// Add extension JSON-config
builder.Configuration.AddJsonFile("Config/serverconfig.json", optional: true, reloadOnChange: true);

var corsPolicyTestMaturalny = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyTestMaturalny, policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://192.168.0.33:3000",
                "http://localhost:5173",
                "https://localhost:5173",
                "http://192.168.0.33:5173",
                "http://192.168.43.91:5173",
                "http://192.168.0.3:81",      // nginx HTTP
                "https://192.168.0.3:81",        // nginx HTTPS (443) 
                "http://192.168.0.3",      // nginx HTTP
                "https://192.168.0.3"        // nginx HTTPS (443)
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithExposedHeaders("X-Total-Count");
    });
});

// Kestrel: включаем HTTPS в Kestrel ТОЛЬКО если есть pfx или явный флаг
var useKestrelHttps = builder.Configuration.GetValue<bool>("Kestrel:EnableHttps", false);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5000); // HTTP всегда
    if (useKestrelHttps)
    {
        // Включаем HTTPS только при наличии сертификата / флага
        serverOptions.ListenAnyIP(7283, listenOptions =>
        {
            listenOptions.UseHttps();
        });
    }
});




builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());

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
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IMessageService, MessageService>();

// ========== AI Services ADD TO PRODUCTION ==========
builder.Services.Configure<AiOptions>(builder.Configuration.GetSection("AI"));

// Регистрация провайдеров
builder.Services.AddHttpClient<GroqProvider>((serviceProvider, client) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
    var config = options.Providers.GetValueOrDefault("Groq");
    if (config?.Enabled == true && !string.IsNullOrEmpty(config.ApiKey))
    {
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {config.ApiKey}");
    }
});

builder.Services.AddHttpClient<GeminiProvider>((serviceProvider, client) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
    var config = options.Providers.GetValueOrDefault("Gemini");
    // Gemini использует API ключ в URL, не в заголовке
});

builder.Services.AddHttpClient<OpenAiProvider>((serviceProvider, client) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
    var config = options.Providers.GetValueOrDefault("OpenAI");
    if (config?.Enabled == true && !string.IsNullOrEmpty(config.ApiKey))
    {
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {config.ApiKey}");
    }
});

builder.Services.AddHttpClient<OllamaProvider>((serviceProvider, client) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
    var config = options.Providers.GetValueOrDefault("Ollama");
    // Ollama не требует авторизации
});

// Регистрация всех провайдеров как IAiProvider
builder.Services.AddScoped<IAiProvider, GroqProvider>();
builder.Services.AddScoped<IAiProvider, GeminiProvider>();
builder.Services.AddScoped<IAiProvider, OpenAiProvider>();
builder.Services.AddScoped<IAiProvider, OllamaProvider>();

// Основной сервис
builder.Services.AddScoped<IAiExplanationService, AiExplanationService>();
//==============================================================



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





////For production
//using TestMaturalnyApp.Data;
//using TestMaturalnyApp.Infrastructure.Logging;
//using Microsoft.EntityFrameworkCore;
//using TestMaturalnyApp.Data.Interfaces;
//using TestMaturalnyApp.Data.Repositories;
//using TestMaturalnyApp.Data.Repositories.Admin;
//using TestMaturalnyApp.Services.Interfaces;
//using TestMaturalnyApp.Services.Interfaces.Admin;
//using TestMaturalnyApp.Services.Interfaces.Auth;
//using TestMaturalnyApp.Services.Services;
//using TestMaturalnyApp.Services.Services.Admin;
//using TestMaturalnyApp.Services.Services.Auth;
//using System.Text.Json.Serialization;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using TestMaturalnyApp.API.Middleware;
//using TestMaturalnyApp.API.Extensions;
//using TestMaturalnyApp.Data.Interfaces.Admin;

//var builder = WebApplication.CreateBuilder(args);

//// ВАЖНО: УДАЛИТЬ ВСЕ НАСТРОЙКИ ПОРТОВ! Они будут через переменные окружения/docker-compose
//// ------------------------------------------------------------------
//// УДАЛИТЬ: builder.WebHost.UseUrls(...);
//// УДАЛИТЬ: builder.WebHost.ConfigureKestrel(...);
//// ------------------------------------------------------------------

//// Конфигурация
//builder.Configuration.AddJsonFile("Config/serverconfig.json", optional: true, reloadOnChange: true);

//// CORS - только нужные origin'ы
//var corsPolicyTestMaturalny = "AllowFrontend";
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(corsPolicyTestMaturalny, policy =>
//    {
//        policy.WithOrigins(
//                "http://localhost:5173",      // Разработка
//                "https://localhost:5173",     // Разработка HTTPS
//                "http://192.168.0.33:5173",   // Ваш React

//                // Продакшен
//                "https://zno-nmt.com.ua",
//                "http://zno-nmt.com.ua",
//                "https://www.zno-nmt.com.ua",
//                "http://www.zno-nmt.com.ua",

//                // API домен (если отдельный)
//                "https://api.zno-nmt.com.ua",
//                "http://api.zno-nmt.com.ua"
//            )
//            .AllowAnyHeader()
//            .AllowAnyMethod()
//            .AllowCredentials()
//            .WithExposedHeaders("X-Total-Count");
//    });
//});

//// Основные сервисы
//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//    });

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// База данных
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//// Кеширование
//builder.Services.AddMemoryCache();

//// HttpContext
//builder.Services.AddHttpContextAccessor();

//// Репозитории и сервисы
//builder.Services.AddScoped<IDisciplineRepository, DisciplineRepository>();
//builder.Services.AddScoped<IDisciplineAdminRepository, DisciplineRepository>();
//builder.Services.AddScoped<IDisciplineService, DisciplineService>();
//builder.Services.AddScoped<IDisciplineAdminService, DisciplineService>();

//builder.Services.AddScoped<ITopicRepository, TopicRepository>();
//builder.Services.AddScoped<ITopicAdminRepository, TopicRepository>();
//builder.Services.AddScoped<ITopicService, TopicService>();
//builder.Services.AddScoped<ITopicAdminService, TopicService>();

//builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
//builder.Services.AddScoped<IQuestionAdminRepository, QuestionRepository>();
//builder.Services.AddScoped<IQuestionService, QuestionService>();
//builder.Services.AddScoped<IQuestionAdminService, QuestionService>();

//builder.Services.AddScoped<IAnswerOptionAdminRepository, AnswerOptionAdminRepository>();
//builder.Services.AddScoped<IAnswerOptionAdminService, AnswerOptionAdminService>();

//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<IUserAdminRepository, UserRepository>();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IUserAdminService, UserService>();

//builder.Services.AddScoped<IUserTokenRepository, UserTokenRepository>();
//builder.Services.AddScoped<IUserTokenService, UserTokenService>();

//builder.Services.AddScoped<ITestSessionRepository, TestSessionRepository>();
//builder.Services.AddScoped<ITestSessionService, TestSessionService>();

//builder.Services.AddScoped<IUserAnswerRepository, UserAnswerRepository>();
//builder.Services.AddScoped<IUserAnswerService, UserAnswerService>();

//builder.Services.AddScoped<IUserOptionService, UserOptionService>();
//builder.Services.AddScoped<IUserOptionRepository, UserOptionRepository>();

//builder.Services.AddScoped<ITestEvaluationService, TestEvaluationService>();
//builder.Services.AddScoped<ITestStatisticsService, TestStatisticsService>();

//builder.Services.AddScoped<ITestExportService, TestExportService>();

//builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

//builder.Services.AddScoped<IMessageRepository, MessageRepository>();
//builder.Services.AddScoped<IMessageService, MessageService>();


//// ========== AI Services ADD TO PRODUCTION ==========
//builder.Services.Configure<AiOptions>(builder.Configuration.GetSection("AI"));

//// Регистрация провайдеров
//builder.Services.AddHttpClient<GroqProvider>((serviceProvider, client) =>
//{
//    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
//    var config = options.Providers.GetValueOrDefault("Groq");
//    if (config?.Enabled == true && !string.IsNullOrEmpty(config.ApiKey))
//    {
//        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {config.ApiKey}");
//    }
//});

//builder.Services.AddHttpClient<GeminiProvider>((serviceProvider, client) =>
//{
//    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
//    var config = options.Providers.GetValueOrDefault("Gemini");
//    // Gemini использует API ключ в URL, не в заголовке
//});

//builder.Services.AddHttpClient<OpenAiProvider>((serviceProvider, client) =>
//{
//    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
//    var config = options.Providers.GetValueOrDefault("OpenAI");
//    if (config?.Enabled == true && !string.IsNullOrEmpty(config.ApiKey))
//    {
//        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {config.ApiKey}");
//    }
//});

//builder.Services.AddHttpClient<OllamaProvider>((serviceProvider, client) =>
//{
//    var options = serviceProvider.GetRequiredService<IOptions<AiOptions>>().Value;
//    var config = options.Providers.GetValueOrDefault("Ollama");
//    // Ollama не требует авторизации
//});

//// Регистрация всех провайдеров как IAiProvider
//builder.Services.AddScoped<IAiProvider, GroqProvider>();
//builder.Services.AddScoped<IAiProvider, GeminiProvider>();
//builder.Services.AddScoped<IAiProvider, OpenAiProvider>();
//builder.Services.AddScoped<IAiProvider, OllamaProvider>();

//// Основной сервис
//builder.Services.AddScoped<IAiExplanationService, AiExplanationService>();
////==============================================================




//// JWT Authentication
//var jwtKey = builder.Configuration["Jwt:Key"];
//if (string.IsNullOrEmpty(jwtKey))
//    throw new Exception("JWT key is missing in configuration");

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!)),
//        ValidateIssuer = false,     // Для упрощения
//        ValidateAudience = false,   // Для упрощения
//        ValidateLifetime = true,
//        ClockSkew = TimeSpan.Zero
//    };
//});

//builder.Services.AddAuthorization();

//// Swagger с JWT
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
//    {
//        Title = "TestMaturalnyApp API",
//        Version = "v1"
//    });

//    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//    {
//        Name = "Authorization",
//        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
//        Scheme = "bearer",
//        BearerFormat = "JWT",
//        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
//    });

//    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
//    {
//        {
//            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//            {
//                Reference = new Microsoft.OpenApi.Models.OpenApiReference
//                {
//                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            Array.Empty<string>()
//        }
//    });
//});

//// Логирование (упрощенное)
//var logPath = builder.Configuration["Logging:File:Path"] ?? "logs/app.log";
//var logDirectory = Path.GetDirectoryName(logPath);

//if (!Directory.Exists(logDirectory) && logDirectory != null)
//{
//    Directory.CreateDirectory(logDirectory);
//}

//builder.Logging.ClearProviders();
//builder.Logging.AddProvider(new FileLoggerProvider(logPath));

//// Сборка приложения
//var app = builder.Build();

//// Конвейер middleware
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseMiddleware<ExceptionMiddleware>();
//app.UseGlobalErrorHandling();
//app.UseCors(corsPolicyTestMaturalny);
//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();

//app.Run();