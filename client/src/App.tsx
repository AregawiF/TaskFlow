import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/owner/OwnerProjects';
import Profile from './pages/owner/Profile';
import { newtonsCradle } from 'ldrs'

import OwnerLayout from './layouts/OwnerLayout';
import MemberLayout from './layouts/MemberLayout';
import PageNotFound from './pages/PageNotFound';
import { jwtDecode } from 'jwt-decode';
import OwnerOverview from './pages/owner/OwnerOverview';
import Members from './pages/owner/Members';
import MemberOverview from './pages/member/MemberOverview';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [role, setRole] = React.useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        navigate('/login');
      } else {
  
        try {
          const decodedToken: any = jwtDecode(token); // Decode the JWT token
          const userRole = decodedToken.payload.role; 
          setIsAuthenticated(true); 
          setRole(userRole); 
        } catch (error) {
          console.error('Invalid token or token expired', error);
          navigate('/login'); 
        }
  
      }
    }, [navigate]);


    if (!isAuthenticated) {
    return (
      <div className="flex justify-center">
        <l-newtons-cradle
        size="140"
        speed="1.4" 
        color="black" 
        ></l-newtons-cradle>
      </div>
    );
  }
  

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Conditional Rendering Based on Role */}
        {role === "owner" ? (
          <Route path="/" element={<OwnerLayout />}>
            <Route path="/dashboard" element={<OwnerOverview />} />
            <Route path="/members" element={<Members />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/profile" element={<Profile />} />
            
          </Route>
        ) : role === "member" ? (
          <Route path="/" element={<MemberLayout />}>
            <Route path="/dashboard" element={<MemberOverview />} />
            <Route path="/my-tasks" element={<Projects />} />
            <Route path="/notifications" element={<Projects />} />
            <Route path="/resources" element={<Projects />} />
            <Route path="/profile" element={<Profile />} />

          </Route>
        ) : (
          <Route path="*" element={<PageNotFound />} />
        )}
      </Routes>
  );
};

export default App;
