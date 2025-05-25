using Microsoft.AspNetCore.Mvc;
using Physiotherapy.Api.Entities;
using Physiotherapy.Api.Services;

namespace Physiotherapy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SessionsController(SessionService sessionService)
{
    [HttpGet("{routineId}")]
    public async ValueTask<IResult> GetSessionsForRoutine(int routineId)
    {
        List<SessionRecording> session = await sessionService.GetSessionsForRoutine(routineId);
        
        return Results.Json(session);
    }
}