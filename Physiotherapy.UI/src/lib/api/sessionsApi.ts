const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export type SessionRecording = {
  id: string;
  routineId: string;
  startTime: Date;
  endTime: Date;
  score: number;
};

export const getSessionsAsync = async (routineId: string) => {
  const response = await fetch(new URL(`${API_ENDPOINT}/sessions/${routineId}`));
  const jsonResponse = await response.json();
  return jsonResponse as SessionRecording[];
};

