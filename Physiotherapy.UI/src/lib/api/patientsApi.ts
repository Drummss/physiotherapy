const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export type Patient = {
  id: string;
  name: string;
};

export const getPatientsAsync = async () => {
  const response = await fetch(new URL(`${API_ENDPOINT}/patients`));
  const jsonResponse = await response.json();
  return jsonResponse as Patient[];
};

export const getPatientAsync = async (id: number) => {
  const response = await fetch(new URL(`${API_ENDPOINT}/patients/${id}`));
  const jsonResponse = await response.json();
  return jsonResponse as Patient;
};

