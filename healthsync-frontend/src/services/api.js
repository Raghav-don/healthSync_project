const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

await axios.post('http://localhost:7002/api/appointments', appointmentData, config);
