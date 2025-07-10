import React, { useEffect, useState } from 'react';
import { getTransactions } from '../../api/user';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import TransactionsList from '../../components/TransactionsList';
import { getTransactions as adminTransactions } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {role}=useAuth();

  useEffect(() => {
    setLoading(true);
    if (role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN) {
      adminTransactions()
        .then(res => setTransactions(res.data.data))
        .finally(() => setLoading(false));
    } else {
      getTransactions()
        .then(res => setTransactions(res.data.data))
        .finally(() => setLoading(false));
    }
  }, [role]);

  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="mb-8 w-full">

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-brand-primary to-brand-light text-">
                <th className="py-3 px-4 text-left rounded-tl-xl">User</th>
                <th className="py-3 px-4 text-left">Date</th>
                {/* <th className="py-3 px-4 text-left">Type</th> */}
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr><td colSpan="5" className="text-center py-6 text-gray-400">No transactions found.</td></tr>
              )}
             <TransactionsList transactions={transactions} />
            </tbody>
          </table>
        </div>
      </div>
      
    </DashboardLayout>
  );
};

export default Transactions;
