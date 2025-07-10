
import axios from 'axios';
let token = localStorage.getItem('token');
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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

export const getUsers = () => axiosInstance.get('/api/admin/users');
export const toggleUser = (id) => axiosInstance.post(`/api/admin/users/${id}/toggle`);
export const getPaymentsSummary = () => axiosInstance.get('/api/admin/payments/summary');
export const getTransactions = () => axiosInstance.get('/api/admin/transactions');