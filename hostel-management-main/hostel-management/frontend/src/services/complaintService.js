import api from './api';

export const getAllComplaints = async () => {
  const response = await api.get('/api/complaints');
  return response.data;
};

export const getMyComplaints = async (regNo) => {
  const response = await api.get(`/api/complaints/${regNo}`); 
  return response.data;
};

export const submitComplaint = async (complaintData) => {
  const response = await api.post('/api/complaints', complaintData);
  return response.data;
};

export const updateComplaintStatus = async (id, status) => {
  const response = await api.put(`/api/complaints/${id}`, { status });
  return response.data;
};
