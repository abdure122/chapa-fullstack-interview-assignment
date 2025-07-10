
import React, { useEffect, useState } from 'react';
import { getUsers, getPaymentsSummary } from '../../api/admin';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import UserList from '../../components/UserList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getPaymentsSummary()
    ]).then(([usersRes, summaryRes]) => {
      setUsers(usersRes.data.data);
      setSummary(summaryRes.data.data);
    }).finally(() => setLoading(false));
  }, []);

 

  if (loading) return <Loader />;

  // General stats for dashboard main page
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.active).length;
  const inactiveUsers = totalUsers - activeUsers;
  const totalPayments = summary?.totalPayments || 0;
  const totalAmount = summary?.totalAmount || 0;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-[#7dc400]">{totalUsers}</div>
            <div className="text-gray-600 mt-2">Total Users</div>
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
            <div className="text-3xl font-bold text-blue-600">{totalPayments}</div>
            <div className="text-gray-600 mt-2">Total Payments</div>
          </div>
        </div>
      
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Latest Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-brand-light text-left text-brand-primary">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <UserList users={users} setUsers={setUsers} />
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
