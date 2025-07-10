
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
export const getAdmins = () => axiosInstance.get('/api/superadmin/admins');
export const getUsers = () => axiosInstance.get('/api/superadmin/users');
export const getStats = () => axiosInstance.get('/api/superadmin/stats');
export const promoteToAdmin = (data) => axiosInstance.post('/api/superadmin/admins', data);
export const removeAdmin = (id) => axiosInstance.delete(`/api/superadmin/admins/${id}`);
