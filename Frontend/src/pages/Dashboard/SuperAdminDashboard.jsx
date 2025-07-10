
import React, { useEffect, useState } from 'react';
import {
  getUsers,
  getStats
} from '../../api/superadmin';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import  formatCurrency  from  '../../utils/formatCurrency';
import { getPaymentsSummary } from '../../api/admin';

import { ROLES } from '../../constants/roles';
import { useAuth } from '../../context/AuthContext';
import UserList from '../../components/UserList';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getStats(),
      getPaymentsSummary()
    ]).then(([usersRes, statsRes, summaryRes]) => {
      setUsers(usersRes.data.data || []);
      setStats(statsRes.data.data || {});
      setSummary(summaryRes.data.data || {});
    }).finally(() => setLoading(false));
  }, []);

  


  if (loading) return <Loader />;

  // General stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.active).length;
  const totalAdmins = users.filter(u => u.role===ROLES.ADMIN).length;
  const inactiveUsers = totalUsers - activeUsers;
  const totalPayments = summary?.reduce((acc, payment) => acc + (payment.total_payments || 0), 0) || 0;

  // Recent users (last 10)
  const recentUsers = [...users].reverse().slice(0, 10);
  const { role } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Super Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-[#7dc400]">{totalUsers}</div>
            <div className="text-gray-600 mt-2">Total Users</div>
          </div>

           <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-[#7dc400]">{totalAdmins}</div>
            <div className="text-gray-600 mt-2">Total Admins</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600">{activeUsers}</div>
            <div className="text-gray-600 mt-2">Active Users</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-red-500">{inactiveUsers}</div>
            <div className="text-gray-600 mt-2">Inactive Users</div>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600">{formatCurrency(totalPayments)}</div>
            <div className="text-gray-600 mt-2">Total Payments</div>
          </div>
         
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Recent Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-brand-light text-left text-brand-primary">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length === 0 && (
                  <tr><td colSpan="5" className="text-center py-4">No users found.</td></tr>
                )}
                <UserList
                  users={recentUsers}
                  setUsers={setUsers}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
     
      
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
