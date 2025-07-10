import React, { useEffect, useState } from 'react';
import { getStats } from '../../api/superadmin';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStats()
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">System Stats</h2>
      {stats ? (
        <ul className="bg-brand-light p-4 rounded">
          <li>Total Payments: <span className="font-bold">{stats.totalPayments}</span></li>
          <li>Active Users: <span className="font-bold">{stats.activeUsers}</span></li>
        </ul>
      ) : <div>No stats data.</div>}
    </DashboardLayout>
  );
};

export default Stats;
