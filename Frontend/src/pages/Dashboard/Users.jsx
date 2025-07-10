import React, { useEffect, useState } from 'react';
import { getUsers, toggleUser } from '../../api/admin';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import UserList from '../../components/UserList';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(res => setUsers(res.data.data))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
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
            <UserList users={users} setUsers={setUsers} />
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Users;
