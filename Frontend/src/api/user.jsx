
import axios from 'axios';
let token = localStorage.getItem('token');
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});
axiosInstance.interceptors.request.use(
  (config) => {
    const t = localStorage.getItem('token');
    if (t) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTransactions = () => axiosInstance.get('/api/user/transactions');
export const initiatePayment = (data) => axiosInstance.post('/api/user/payments/initiate', data);
