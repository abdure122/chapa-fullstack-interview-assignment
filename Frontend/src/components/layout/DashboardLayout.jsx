
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SidebarUser from './SidebarUser';
import SidebarAdmin from './SidebarAdmin';
import SidebarSuperAdmin from './SidebarSuperAdmin';

const DashboardLayout = ({ children }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  let Sidebar = null;
  if (role === 'User') Sidebar = SidebarUser;
  else if (role === 'Admin') Sidebar = SidebarAdmin;
  else if (role === 'Super Admin') Sidebar = SidebarSuperAdmin;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {Sidebar && <Sidebar />}
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col">
        {/* Topbar */}
        <header className="w-full b flex items-center justify-between px-8 py-4">
          <div className="font-semibold text-lg">Welcome, {user?.name}</div>
          {/* <div className="text-brand-primary font-bold">{role}</div> */}
          <button onClick={handleLogout} className="ml-4 py-2 px-4 rounded bg-red-500 hover:bg-red-400 transition text-white">Logout</button>
        </header>
        <main className="flex-1 w-full p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
