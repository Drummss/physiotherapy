const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export type Routine = {
  id: string;
  patientId: string;
  activity: string,
  date: Date;
  targetDuration: number;
  status: string;
};

export const getPatientRoutinesAsync = async (patientId: string) => {
  const response = await fetch(new URL(`${API_ENDPOINT}/patients/${patientId}/routines`));
  const jsonResponse = await response.json();
  return jsonResponse as Routine[];
};

export const getPatientRoutineAsync = async (patientId: string, routineId: string) => {
  const response = await fetch(new URL(`${API_ENDPOINT}/patients/${patientId}/routines/${routineId}`));
  const jsonResponse = await response.json();
  return jsonResponse as Routine;
};

export const schedulePatientRoutine = async (patientId: string, date: Date, activity: string, duration: number) => {
  const response = await fetch(new URL(`${API_ENDPOINT}/patients/${patientId}/routines`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      activity,
      targetDuration: duration,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to schedule routine");
  }

  const jsonResponse = await response.json();

  return jsonResponse as Routine;
};
