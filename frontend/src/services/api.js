import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ============ AUTHENTIFICATION ============

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ============ ROUTES ============

export const getRoutes = async (type = null) => {
  const params = type ? { type } : {};
  const response = await api.get('/routes', { params });
  return response.data;
};

export const getRouteById = async (id) => {
  const response = await api.get(`/routes/${id}`);
  return response.data;
};

// ============ STATIONS ============

export const getStations = async (type = null) => {
  const params = type ? { type } : {};
  const response = await api.get('/stations', { params });
  return response.data;
};

// ============ BUS ============

export const getBuses = async () => {
  const response = await api.get('/buses');
  return response.data;
};

export const updateBusPosition = async (busId, position) => {
  const response = await api.put(`/buses/${busId}/position`, position);
  return response.data;
};

// ============ RÉSERVATIONS ============

export const createReservation = async (reservationData) => {
  const response = await api.post('/reservations', reservationData);
  return response.data;
};

export const getUserReservations = async (userId) => {
  const response = await api.get(`/reservations/user/${userId}`);
  return response.data;
};

export const validateTicket = async (ticketId) => {
  const response = await api.post('/reservations/validate', { ticketId });
  return response.data;
};

// ============ STATISTIQUES ============

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export default api;