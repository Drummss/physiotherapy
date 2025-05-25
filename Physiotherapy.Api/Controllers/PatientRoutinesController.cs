using Microsoft.AspNetCore.Mvc;
using Physiotherapy.Api.Entities;
using Physiotherapy.Api.Models;
using Physiotherapy.Api.Services;

namespace Physiotherapy.Api.Controllers;

[ApiController]
[Route("api/patients/{patientId}/routines")]
public class PatientRoutinesController(RoutineService routineService)
{
    [HttpGet]
    public async ValueTask<IResult> Get(int patientId)
    {
        IEnumerable<Routine> routines = await routineService.GetRoutinesForPatientAsync(patientId);
        return Results.Json(routines.ToList());
    }
    
    [HttpGet("{id}")]
    public async ValueTask<IResult> Get(int patientId, int id)
    {
        Routine? routine = await routineService.GetRoutineByIdAsync(id);

        if (routine == null || routine.PatientId != patientId)
        {
            return Results.NotFound();
        }

        return Results.Json(routine);
    }

    [HttpPost]
    public async ValueTask<IResult> Create(int patientId, [FromBody] CreateRoutineRequest model)
    {
        Routine routine = await routineService.CreateRoutineAsync(new Routine()
        {
            PatientId = patientId,
            Activity = model.Activity,
            Date = model.Date,
            TargetDuration = model.TargetDuration,
        });

        return Results.Json(routine);
    }
}