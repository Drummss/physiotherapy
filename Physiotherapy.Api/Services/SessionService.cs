using Physiotherapy.Api.Entities;

namespace Physiotherapy.Api.Services;

public class SessionService(IEntityRepository<SessionRecording> recordingRepository)
{
    public async ValueTask<List<SessionRecording>> GetSessionsForRoutine(int routineId)
    {
        List<SessionRecording> recordings = (await recordingRepository.AllAsync()).ToList();
        List<SessionRecording> recordingsForRoutine = recordings.Where(r => r.RoutineId == routineId).ToList();
        
        return recordingsForRoutine;
    }
}