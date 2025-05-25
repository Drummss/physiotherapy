using Physiotherapy.Api.Entities;
using Physiotherapy.Api.Objects;

namespace Physiotherapy.Api.Extensions;

public static class DataSeederExtensions
{
    public static async Task<WebApplication> SeedDataAsync(this WebApplication app)
    {
        IEntityRepository<Patient> patientRepository = app.Services.GetRequiredService<IEntityRepository<Patient>>();

        Patient johnDoe = await patientRepository.AddAsync(new Patient()
        {
            Name = "John Doe",
        });

        await patientRepository.AddAsync(new Patient()
        {
            Name = "Jane Doe",
        });

        IEntityRepository<Routine> routineRepository = app.Services.GetRequiredService<IEntityRepository<Routine>>();

        await routineRepository.AddAsync(new Routine()
            {
                PatientId = johnDoe.Id,
                Activity = "Activity Type 1",
                Date = DateTime.Now.AddDays(-3),
                TargetDuration = 30,
            }
        );
        
        await routineRepository.AddAsync(new Routine()
            {
                PatientId = johnDoe.Id,
                Activity = "Activity Type 1",
                Date = DateTime.Now.AddDays(-1),
                TargetDuration = 30,
                Status = RoutineStatus.Completed,
            }
        );
        
        await routineRepository.AddAsync(new Routine()
            {
                PatientId = johnDoe.Id,
                Activity = "Activity Type 2",
                Date = DateTime.Now.AddDays(2),
                TargetDuration = 60,
            }
        );
        
        IEntityRepository<SessionRecording> sessionRepository = app.Services.GetRequiredService<IEntityRepository<SessionRecording>>();
        
        await sessionRepository.AddAsync(new SessionRecording()
            {
                RoutineId = 2,
                StartTime = DateTime.Now.AddDays(-1).AddHours(-2),
                EndTime = DateTime.Now.AddDays(-1).AddHours(-1).AddMinutes(-32),
                Score = 80,
            }
        );

        return app;
    }
}