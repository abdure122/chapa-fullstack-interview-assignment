import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user?.role) return <div className="text-center py-10 text-red-500">Unauthorized or loading...</div>;

  switch (user?.role) {
    case 'User':
      return <UserDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    case 'Super Admin':
      return <SuperAdminDashboard />;
    default:
      return <div className="text-center py-10 text-red-500">Unauthorized</div>;
  }
};

export default Dashboard;
