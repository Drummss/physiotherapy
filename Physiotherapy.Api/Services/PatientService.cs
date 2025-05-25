using Physiotherapy.Api.Entities;

namespace Physiotherapy.Api.Services;

public class PatientService(IEntityRepository<Patient> patientRepository)
{
    public async ValueTask<IEnumerable<Patient>> GetPatientsAsync()
    {
        return await patientRepository.AllAsync();
    }
    
    public async ValueTask<Patient?> GetPatientAsync(int id)
    {
        return await patientRepository.GetAsync(id);
    }
}