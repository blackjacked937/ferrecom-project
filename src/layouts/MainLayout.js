import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar />}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;