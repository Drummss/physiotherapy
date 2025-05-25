using Microsoft.AspNetCore.Mvc;
using Physiotherapy.Api.Entities;
using Physiotherapy.Api.Services;

namespace Physiotherapy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController(PatientService patientService)
{
    [HttpGet]
    public async ValueTask<IResult> Get()
    {
        IEnumerable<Patient> patients = await patientService.GetPatientsAsync();
        return Results.Json(patients.ToList());
    }
    
    [HttpGet("{id}")]
    public async ValueTask<IResult> Get(int id)
    {
        Patient? patient = await patientService.GetPatientAsync(id);

        if (patient == null)
        {
            return Results.NotFound();
        }
        
        return Results.Json(patient);
    }
}