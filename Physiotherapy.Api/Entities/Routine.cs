using System.Text.Json.Serialization;
using Physiotherapy.Api.Objects;

namespace Physiotherapy.Api.Entities;

public class Routine
{
    public int Id { get; set; }
    
    public required int PatientId { get; init; }
    
    public required string Activity { get; set; }
    
    public required DateTime Date { get; set; }
    
    /// <summary>
    /// Duration in minutes.
    /// </summary>
    public required int TargetDuration { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RoutineStatus Status { get; set; } = RoutineStatus.Scheduled;
}