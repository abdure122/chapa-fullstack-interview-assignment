import React from 'react';
import formatCurrency from '../utils/formatCurrency';

const WalletBalance = ({ balance }) => (
  <div className="p-4 bg-green-100 rounded">
    <span className="font-bold">Wallet Balance: </span>
    <span>{formatCurrency(balance)}</span>
  </div>
);

export default WalletBalance;
