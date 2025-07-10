import React, { useEffect, useState } from 'react';
import { getPaymentsSummary } from '../../api/admin';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import PaymentSummary from '../../components/PaymentSummary';

const PaymentsSummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPaymentsSummary()
      .then(res => {
        // If response is an array, set directly; if object, try to extract array
        const data = res.data.data;
        if (Array.isArray(data)) setSummary(data);
        else if (Array.isArray(data?.summary)) setSummary(data.summary);
        else setSummary([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Payments Summary</h2>
      {summary.length > 0 ? (
        <PaymentSummary summary={summary} />
      ) : <div>No summary data.</div>}
    </DashboardLayout>
  );
};

export default PaymentsSummary;
