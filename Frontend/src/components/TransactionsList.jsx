import React from 'react';

const TransactionsList = ({ transactions }) => (
  <>
    {transactions.map(tx => (
      <tr key={tx.id} className="border-b last:border-b-0 hover:bg-brand-light/30 transition">
        <td className="py-2 px-4 font-medium text-brand-primary">{tx.user}</td>
        <td className="py-2 px-4 text-gray-600">{tx.created_at ? new Date(tx.created_at).toLocaleString() : ''}</td>
        {/* <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${tx.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{tx.type}</span>
                  </td> */}
        <td className="py-2 px-4 font-mono">{tx.amount} ETB</td>
        <td className="py-2 px-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${tx.status === 'completed' ? 'bg-green-200 text-green-800' : tx.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{tx.status}</span>
        </td>
      </tr>
    ))}
  </>
);

export default TransactionsList;
