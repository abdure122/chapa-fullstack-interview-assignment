
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SidebarUser from './SidebarUser';
import SidebarAdmin from './SidebarAdmin';
import SidebarSuperAdmin from './SidebarSuperAdmin';

const DashboardLayout = ({ children }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  let Sidebar = null;
  if (role === 'User') Sidebar = SidebarUser;
  else if (role === 'Admin') Sidebar = SidebarAdmin;
  else if (role === 'Super Admin') Sidebar = SidebarSuperAdmin;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar: hidden on mobile, toggleable */}
      <div className="md:block hidden">
        {Sidebar && <Sidebar />}
      </div>
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-30">
        <div className="font-semibold text-lg">Welcome, {user?.name}</div>
        <button
          className="text-[#7dc400] font-bold text-2xl focus:outline-none"
          onClick={() => setShowSidebar(s => !s)}
          aria-label="Open sidebar"
        >
          &#9776;
        </button>
      </div>
      {/* Mobile sidebar drawer */}
      {showSidebar && Sidebar && (
        <div className="fixed inset-0 z-40 flex">
          <div className="bg-black bg-opacity-40 w-full h-full" onClick={() => setShowSidebar(false)}></div>
          <div className="w-64 bg-white shadow-lg h-full z-50 animate-slide-in-left">
            <Sidebar />
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col min-h-screen">
        {/* Topbar (desktop) */}
        <header className="hidden md:flex w-full b items-center justify-between px-8 py-4 bg-white shadow">
          <div className="font-semibold text-lg">Welcome, {user?.name}</div>
          <button onClick={handleLogout} className="ml-4 py-2 px-4 rounded bg-red-500 hover:bg-red-400 transition text-white">Logout</button>
        </header>
        <main className="flex-1 w-full p-4 md:p-8">{children}</main>
      </div>
    </div>
  );

}

export default DashboardLayout;