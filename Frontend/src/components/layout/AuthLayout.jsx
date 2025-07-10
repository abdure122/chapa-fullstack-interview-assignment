import React from 'react';

export default function AuthLayout({ children, hero }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row b">
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-md p-6 md:p-10">{children}</div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center  transition-colors duration-500">
        <div className="text-black text-center px-8">
          {hero || (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome to Chapa</h2>
              <p className="text-lg opacity-80">Seamless Payments, Endless Opportunities!
</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
