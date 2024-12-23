import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerProjects from './pages/owner/OwnerProjects';
import OwnerProfile from './pages/owner/OwnerProfile';
import { newtonsCradle } from 'ldrs'

import OwnerLayout from './layouts/OwnerLayout';
import MemberLayout from './layouts/MemberLayout';
import PageNotFound from './pages/PageNotFound';
import { jwtDecode } from 'jwt-decode';
import OwnerOverview from './pages/owner/OwnerOverview';
import Members from './pages/owner/Members';
import MemberOverview from './pages/member/MemberOverview';
import ProjectDetail from './components/ProjectDetail';
import MemberProfile from './pages/member/MemberProfile';
import MemberResources from './pages/member/MemberResources';
import MemberMyTasks from './pages/member/MemberMyTasks';
import MemberNotification from './pages/member/MemberNotification';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [role, setRole] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true); // Add a loading state

  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');

  // Allow unauthenticated users to access login and register routes
  const publicRoutes = ['/login', '/register'];
  if (publicRoutes.includes(window.location.pathname)) {
    setLoading(false); // Not loading anymore

    return;
  }

  if (!token) {
    navigate('/login');
    setLoading(false); // Not loading anymore

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
    finally {
      setLoading(false); // Stop loading after processing the token
    }
  }
}, [navigate]);


    if (loading) {
        // Display a loading spinner or placeholder while waiting
        return <div>Loading...</div>;
      }


  

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect / to /dashboard */}
        <Route
          path="/"
          element={
            role === "owner" ? (
              <Navigate to="/dashboard" />
            ) : role === "member" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        {/* Conditional Rendering Based on Role */}
        {role === "owner" ? (
          <Route path="/" element={<OwnerLayout />}>
            <Route path="/dashboard" element={<OwnerOverview />} />
            <Route path="/members" element={<Members />} />
            <Route path="/projects" element={<OwnerProjects />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/profile" element={<OwnerProfile />} />
            
          </Route>
        ) : role === "member" ? (
          <Route path="/" element={<MemberLayout />}>

            <Route path="/dashboard" element={<MemberOverview />} />
            <Route path="/my-tasks" element={<MemberMyTasks />} />
            <Route path="/notifications" element={<MemberNotification />} />
            <Route path="/resources" element={<MemberResources />} />
            <Route path="/profile" element={<MemberProfile />} />

          </Route>
        ) : (
          
        <Route path='*' element={<PageNotFound/>}/>
        )}
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
  );
};

export default App;
