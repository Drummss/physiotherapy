using Physiotherapy.Api;
using Physiotherapy.Api.Entities;
using Physiotherapy.Api.Extensions;
using Physiotherapy.Api.Services;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Core Services
builder.Services.AddControllers();

// Application Services
builder.Services.AddScoped<RoutineService>();
builder.Services.AddScoped<PatientService>();
builder.Services.AddScoped<SessionService>();

// Entity Services
builder.Services.AddSingleton<IEntityRepository<Patient>, InMemoryEntityRepository<Patient>>();
builder.Services.AddSingleton<IEntityRepository<Routine>, InMemoryEntityRepository<Routine>>();
builder.Services.AddSingleton<IEntityRepository<SessionRecording>, InMemoryEntityRepository<SessionRecording>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policyBuilder => policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

WebApplication app = builder.Build();

app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapControllers();

await app.SeedDataAsync();

app.Run();