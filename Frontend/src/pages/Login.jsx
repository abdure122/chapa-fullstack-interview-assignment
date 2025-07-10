

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import BrandInput from '../components/ui/BrandInput';
import BrandButton from '../components/ui/BrandButton';



const Login = () => {
  const { login, loading, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && token) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);


  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };



  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setFieldError(errors);
    if (Object.keys(errors).length > 0) return;
    await login(email, password, navigate);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto px-2 md:px-0"
      >
        <h2 className="text-3xl font-extrabold  mb-6 text-center tracking-tight">Sign in</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <BrandInput
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          error={ fieldError.email}
        />
        <BrandInput
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={fieldError.password}
        />
        <BrandButton loading={loading} label={loading ? 'Logging in...' : 'Login'} />
        <div className="text-center mt-2">
          <span className="text-sm text-gray-700">Don't have an account? </span>
          <Link to="/register" className="text-brand-white font-semibold hover:underline">Sign up</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
