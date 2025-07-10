import React from 'react';

const PaymentSummary = ({ summary }) => (
  <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-brand-light text-brand-primary">
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Total Payments (ETB)</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-4 font-medium">{item.user}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.total_payments > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.total_payments}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
);

export default PaymentSummary;
