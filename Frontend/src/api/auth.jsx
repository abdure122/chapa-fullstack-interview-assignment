import axios from 'axios';
import { API } from '../constants/api';

let token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const t = localStorage.getItem('token');
    if (t) config.headers['Authorization'] = `Bearer ${t}`;
    return config;
  },
  (error) => Promise.reject(error)
);


export const login = async (email, password) => {
  await axiosInstance.get('/sanctum/csrf-cookie');
  const { data } = await axiosInstance.post(API.LOGIN, { email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};


export const register = async (payload) => {
  await axiosInstance.get('/sanctum/csrf-cookie');
  const { data } = await axiosInstance.post(API.REGISTER, payload);
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};


export const getUser = async () => {
  const { data } = await axiosInstance.get(API.CURRENT_USER);
  return data;
};


export const logout = async () => {
  await axiosInstance.post(API.LOGOUT);
  localStorage.removeItem('token');
};
