using Physiotherapy.Api.Entities;

namespace Physiotherapy.Api.Services;

public class RoutineService(IEntityRepository<Routine> routineRepository)
{
    public async ValueTask<Routine> CreateRoutineAsync(Routine routine)
    {
        Routine newRoutine = await routineRepository.AddAsync(routine);
        return newRoutine;
    }

    public async ValueTask<Routine?> GetRoutineByIdAsync(int id)
    {
        return await routineRepository.GetAsync(id);
    }

    public async ValueTask<IEnumerable<Routine>> GetRoutinesForPatientAsync(int patientId)
    {
        return (await routineRepository.AllAsync()).Where(e => e.PatientId == patientId);
    }
}