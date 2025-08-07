import { api } from '../services/api';

export const bookAppointment = async (appointmentData) => {
  const response = await api.post('/appointments/book', appointmentData);
  return response.data;
};