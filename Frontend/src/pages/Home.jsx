import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-500">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-brand-light tracking-tight text-center transition-colors duration-500 drop-shadow-lg">
        Welcome{user ? `, ${user.name}` : ''} to Chapa Test Project
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-xs">
        {user ? (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-[#7dc400] hover:bg-[#6cbf00]/50 text-brand shadow-xl hover:bg-[#7dc400] hover:bg-[#6cbf00]/50 hover:text-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => logout(navigate)}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-red-500 hover:bg-red-600 text-white shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
              disabled={loading}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-[#7dc400] hover:bg-[#6cbf00]/50 text-brand shadow-xl hover:bg-[#7dc400] hover:bg-[#6cbf00]/50 hover:text-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-[#7dc400] text-brand shadow-xl hover:bg-[#7dc400] hover:bg-[#6cbf00]/50 hover:text-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
