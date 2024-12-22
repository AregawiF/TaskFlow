import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const MemberLayout: React.FC = () => {

  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

    
  return (
    <div className="min-h-screen flex flex-col">
      {/* Member's Navbar */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Member Dashboard</h1>
        <button onClick={() => {handleLogout}} className="bg-green-800 hover:bg-green-800 text-white py-2 px-4 rounded">
          Log Out
        </button>
      </header>

      <div className="flex flex-grow">
        {/* Member's Sidebar */}
        <aside className="bg-green-900 text-white w-1/5 min-h-full flex flex-col p-4">
          <nav className="space-y-4">


            <Link
              to="/dashboard"
              className={`block py-2 px-4 rounded ${location.pathname === "/dashboard" ? "bg-green-700" : "hover:bg-green-700"}`}
            >
              Overview
            </Link>

            <Link
              to="/my-tasks"
              className={`block py-2 px-4 rounded ${location.pathname === "/my-tasks" ? "bg-green-700" : "hover:bg-green-700"}`}
            >
              My Tasks
            </Link>
            <Link
              to="/notifications"
              className={`block py-2 px-4 rounded ${location.pathname === "/notifications" ? "bg-green-700" : "hover:bg-green-700"}`}
            >
              Notifications
            </Link>
            <Link
              to="/resources"
              className={`block py-2 px-4 rounded ${location.pathname === "/resources" ? "bg-green-700" : "hover:bg-green-700"}`}
            >
              Resources
            </Link>
            <Link
              to="/profile"
              className={`block py-2 px-4 rounded ${location.pathname === "/profile" ? "bg-green-700" : "hover:bg-green-700"}`}
            >
              Profile
            </Link>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-green-100 p-6">
          <Outlet /> {/* This will render the child routes (MemberDashboard, Profile, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
