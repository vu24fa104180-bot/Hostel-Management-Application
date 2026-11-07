import api from './api';

export const getMyPayments = async (regNo) => {
  const response = await api.get(`/api/payments/${regNo}`);
  return response.data;
};

export const getAllPayments = async () => {
  const response = await api.get('/api/payments');
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await api.post('/api/payments', paymentData);
  return response.data;
};
