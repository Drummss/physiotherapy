namespace Physiotherapy.Api.Entities;

public class SessionRecording
{
    public int Id { get; set; }
    
    public required int RoutineId { get; init; }
    
    public required DateTime StartTime { get; set; }
    
    public required DateTime EndTime { get; set; }
    
    public required int Score { get; set; }
}