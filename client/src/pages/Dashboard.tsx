// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      setIsAuthenticated(true); // If token exists, set as authenticated
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Show nothing until we confirm authentication
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-2">You are logged in!</p>
      {/* Add your dashboard content here */}



      




    </div>
  );
};

export default Dashboard;
