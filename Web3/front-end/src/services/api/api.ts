import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


interface UserData {
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const signup = async (userData: UserData) => {
  const res = await api.post('/auth/signup', userData);
  return res.data;
};

export const login = async (credentials: Credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const refresh = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};
