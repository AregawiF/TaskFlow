import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const OwnerLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Owner's Navbar */}
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
        <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Log Out
        </button>
      </header>

      <div className="flex flex-grow">
        {/* Owner's Sidebar */}
        <aside className="bg-gray-900 text-white w-1/5 min-h-full flex flex-col p-4">
          <nav className="space-y-4">

            <Link
              to="/dashboard"
              className={`block py-2 px-4 rounded ${location.pathname === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              Overview
            </Link>

            <Link
              to="/members"
              className={`block py-2 px-4 rounded ${location.pathname === "/members" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              Members
            </Link>
            <Link
              to="/projects"
              className={`block py-2 px-4 rounded ${location.pathname === "/projects" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              Projects
            </Link>
            <Link
              to="/profile"
              className={`block py-2 px-4 rounded ${location.pathname === "/profile" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              Profile
            </Link>
            
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-6">
          <Outlet /> {/* This will render the child routes (OwnerDashboard, Profile, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
