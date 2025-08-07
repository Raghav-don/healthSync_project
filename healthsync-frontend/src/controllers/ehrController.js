import { api } from '../services/api';

export const getEHRRecords = async (patientId) => {
  const response = await api.get(`/ehr/${patientId}`);
  return response.data;
};