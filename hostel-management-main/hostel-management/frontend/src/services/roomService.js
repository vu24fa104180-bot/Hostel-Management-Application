import api from './api';

export const getRooms = async () => {
  const response = await api.get('/api/rooms');
  return response.data;
};

export const getRoomById = async (id) => {
  const response = await api.get(`/api/rooms/${id}`);
  return response.data;
};

export const addRoom = async (roomData) => {
  const response = await api.post('/api/rooms', roomData);
  return response.data;
};

export const updateRoom = async (id, roomData) => {
  const response = await api.put(`/api/rooms/${id}`, roomData);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await api.delete(`/api/rooms/${id}`);
  return response.data;
};
