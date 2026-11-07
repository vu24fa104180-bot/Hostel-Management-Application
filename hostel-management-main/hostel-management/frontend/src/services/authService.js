import api from './api';

export const loginUser = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || 'null');
};
