import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { getCurrentUser } from '../../services/authService';

const MainLayout = ({ allowedRole }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (allowedRole && user.role !== allowedRole) {
      // Redirect if the user tries to access the other role's pages
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate, allowedRole]);

  if (!user) return null; // Prevent flicker before redirect

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
