const BASE_URL = "http://127.0.0.1:8000/api"; // or from .env

export const API = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  CURRENT_USER: `${BASE_URL}/auth/user`,

  USER_TRANSACTIONS: `${BASE_URL}/user/transactions`,
  USER_INIT_PAYMENT: `${BASE_URL}/user/payments/initiate`,

  ADMIN_USERS: `${BASE_URL}/admin/users`,
  ADMIN_TOGGLE_USER: (id) => `${BASE_URL}/admin/users/${id}/toggle`,
  ADMIN_PAYMENT_SUMMARY: `${BASE_URL}/admin/payments/summary`,

  SUPERADMIN_STATS: `${BASE_URL}/superadmin/stats`,
  SUPERADMIN_CREATE_ADMIN: `${BASE_URL}/superadmin/admins`,
  SUPERADMIN_DELETE_ADMIN: (id) => `${BASE_URL}/superadmin/admins/${id}`,
};
