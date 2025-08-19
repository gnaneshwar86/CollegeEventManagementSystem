import axios from 'axios';

// Base axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // backend URL
  headers: { 'Content-Type': 'application/json' },
});

export default api;
