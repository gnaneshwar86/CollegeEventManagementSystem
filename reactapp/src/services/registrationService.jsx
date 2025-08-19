import api from './api';

export const registerStudent = async (data) => {
  const response = await api.post('/registrations', data);
  return response.data;
};

export const getRegistrations = async () => {
  const response = await api.get('/registrations');
  return response.data;
};
