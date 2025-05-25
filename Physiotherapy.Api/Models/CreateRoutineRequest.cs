namespace Physiotherapy.Api.Models;

public class CreateRoutineRequest
{
    public required string Activity { get; set; }
    
    public required DateTime Date { get; set; }
    
    public required int TargetDuration { get; set; }
}