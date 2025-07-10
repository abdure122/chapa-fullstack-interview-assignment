
import React, { useEffect, useState } from 'react';
import { getTransactions, initiatePayment } from '../../api/user';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import BrandButton from '../../components/ui/BrandButton';
import { useAuth } from '../../context/AuthContext';
import TransactionsList from '../../components/TransactionsList';
import WalletBalance from '../../components/WalletBalance';

const UserDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payAmount, setPayAmount] = useState('');
    const [payTo, setPayTo] = useState('');
    const [payLoading, setPayLoading] = useState(false);
    const [payError, setPayError] = useState(null);
    const [paySuccess, setPaySuccess] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('telebirr');
    const { user } = useAuth();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!user || !token) return;
        setLoading(true);
        getTransactions()
            .then(res => {
                setTransactions(res.data.data);
            })
            .finally(() => setLoading(false));
    }, [user]);


    const handlePayment = (e) => {
        e.preventDefault();
        setPayError(null);
        setPaySuccess(null);
        setShowPaymentModal(true);
    };

    const handleConfirmPayment = async () => {
        setPayLoading(true);
        setPayError(null);
        setPaySuccess(null);
        try {
            const res = await initiatePayment({ amount: payAmount, to: payTo, method: selectedMethod });
            setTransactions(prev => [res.data.data, ...prev]);
            setPaySuccess('Payment initiated!');
            setPayAmount('');
            setPayTo('');
            setShowPaymentModal(false);
        } catch (err) {
            setPayError(err.response?.data?.message || 'Payment failed');
        } finally {
            setPayLoading(false);
        }
    };

    const handleCancelPayment = () => {
        setShowPaymentModal(false);
        setPayLoading(false);
    };

    if (loading) return <Loader />;

    return (
        <DashboardLayout>
            <div className="mb-8">
                <WalletBalance balance={transactions.reduce((acc, tx) => acc + Number(tx.amount), 0)} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <div className="mb-8 w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
                        <thead>
                            <tr className="bg-gradient-to-r from-brand-primary to-brand-light text-">
                                <th className="py-3 px-4 text-left rounded-tl-xl">User</th>
                                <th className="py-3 px-4 text-left">Date</th>
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
            <div className="max-w-md bg-white rounded shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Initiate Payment</h3>
                <form onSubmit={handlePayment} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="px-4 py-2 border rounded"
                        value={payTo}
                        onChange={e => setPayTo(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount (ETB)"
                        className="px-4 py-2 border rounded"
                        value={payAmount}
                        onChange={e => setPayAmount(e.target.value)}
                        required
                        min="1"
                    />
                    <BrandButton loading={false} label={'Initiate Payment'} />
                    {payError && <div className="text-red-500 text-sm">{payError}</div>}
                    {paySuccess && <div className="text-green-600 text-sm">{paySuccess}</div>}
                </form>
            </div>

            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-8 text-center">Confirm Payment</h3>
                        <p className="mb-8 text-center">
                            You are about to pay <span className="font-semibold text-brand-primary">{payAmount} ETB</span> with <br/> <span className="font-semibold text-left">{payTo}</span>
                        </p>
                        <div className="mb-12">
                            <div className="font-semibold mb-4 text-center">Choose Payment Method</div>
                            <div className="flex justify-center gap-3 mb-6">
                                {['telebirr', 'CBE-Birr', 'M-pesa'].map(method => (
                                    <button
                                        key={method}
                                        type="button"
                                        className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-150 focus:outline-none 
                                            ${selectedMethod === method ? 'border-[#7dc400] bg-[#eaffd0] text-[#7dc400]' : 'border-gray-200 bg-gray-50 text-gray-700'}`}
                                        onClick={() => setSelectedMethod(method)}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center gap-8">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                                onClick={handleCancelPayment}
                                disabled={payLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded font-semibold text-white bg-[#7dc400] hover:bg-[#6cbf00] transition`}
                                onClick={handleConfirmPayment}
                                disabled={payLoading}
                            >
                                {payLoading ? 'Processing...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default UserDashboard;
