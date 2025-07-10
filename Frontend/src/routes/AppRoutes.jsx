import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Dashboard/Users';
import Transactions from '../pages/Dashboard/Transactions';
import PaymentsSummary from '../pages/Dashboard/PaymentsSummary';
import Stats from '../pages/Dashboard/Stats';
import Admins from '../pages/Dashboard/Admins';
import RequireAuth from './RequireAuth';
import Home from '../pages/Home';

const AppRoutes = () => (

  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RequireAuth />}> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payments-summary" element={<PaymentsSummary />} />
        <Route path="/admins" element={<Admins />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
