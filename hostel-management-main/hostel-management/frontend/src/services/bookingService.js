import api from './api';

export const getAllBookings = async () => {
  const response = await api.get('/api/bookings');
  return response.data;
};

export const getMyBooking = async (regNo) => {
  const response = await api.get(`/api/bookings/${regNo}`);
  return response.data;
};

export const bookRoom = async (bookingData) => {
  const response = await api.post('/api/bookings', bookingData);
  return response.data;
};
