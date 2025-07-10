import React, { useEffect, useState } from 'react';
import { promoteToAdmin, removeAdmin, getAdmins } from '../../api/superadmin';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import UserList from '../../components/UserList';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAdmins()
            .then(res => setAdmins(res.data.data))
            .finally(() => setLoading(false));
    }, []);


    if (loading) return <Loader />;

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Admins</h2>
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white rounded shadow">
                    <thead>
                        <tr className="bg-brand-light text-brand-primary">
                            <th className="py-2 px-4">Name</th>

                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {admins.length === 0 && (
                            <tr><td colSpan="3" className="text-center py-4">No admins found.</td></tr>
                        )} */}
                        <UserList users={admins} setUsers={setAdmins} />
                    </tbody>
                </table>
            </div>
           
        </DashboardLayout>
    );
};

export default Admins;
