import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SidebarUser = () => (
    <aside className="w-64 flex flex-col py-6 px-4 min-h-screen bg-white border-r border-gray-100 shadow-sm">
        <div className="text-2xl font-bold mb-8 text-[#7dc400]">Chapa</div>
        <nav className="flex-1 flex flex-col gap-2">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `py-2 px-4 rounded font-semibold transition-all duration-150 ` +
                    (isActive
                        ? 'bg-[#7dc400] text-white'
                        : 'bg-gray-100 text-black hover:bg-gray-200')
                }
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/transactions"
                className={({ isActive }) =>
                    `py-2 px-4 rounded font-semibold transition-all duration-150 ` +
                    (isActive
                        ? 'bg-[#7dc400] text-white'
                        : 'bg-gray-100 text-black hover:bg-gray-200')
                }
            >
                Transactions
            </NavLink>
            {/*
      <Link
        to="/dashboard/transactions"
        className="py-2 px-4 rounded bg-[#7dc400] hover:bg-[#6cbf00]/50 text-white font-semibold transition-all duration-150"
      >
        Transactions
      </Link>
      <Link
        to="/dashboard/pay"
        className="py-2 px-4 rounded bg-[#7dc400] hover:bg-[#6cbf00]/50 text-white font-semibold transition-all duration-150"
      >
        Initiate Payment
      </Link>
      */}
        </nav>
    </aside>
);

export default SidebarUser;
