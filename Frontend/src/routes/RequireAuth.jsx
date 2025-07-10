import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';

const RequireAuth = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
