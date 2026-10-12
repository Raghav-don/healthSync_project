import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7010/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT Token into all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch 401s and clean invalid tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or unauthorized
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

// Auth & Users API
export const authAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (data) => api.post('/users/register', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getDoctors: (specialization) => api.get('/users/doctors', { params: { specialization } }),
  getDoctorById: (id) => api.get(`/users/doctors/${id}`),
};

// Appointments API
export const appointmentAPI = {
  book: (data) => api.post('/appointments', data),
  getMy: () => api.get('/appointments'),
  getDoctorAppointments: () => api.get('/appointments/doctor'),
  getById: (id) => api.get(`/appointments/${id}`),
  updateStatus: (id, status, notes) => api.patch(`/appointments/${id}/status`, { status, notes }),
  cancel: (id) => api.delete(`/appointments/${id}`),
  getStats: () => api.get('/appointments/stats'),
};

// EHR API
export const ehrAPI = {
  getMy: () => api.get('/ehr/my'),
  create: (data) => api.post('/ehr', data),
  getByPatient: (patientId) => api.get(`/ehr/patient/${patientId}`),
  update: (id, data) => api.put(`/ehr/${id}`, data),
};

export default api;
