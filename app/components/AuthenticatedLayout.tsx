'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import LoginModal from '../users/LoginModal';
import Sidebar from './Sidebar';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false); // Default to false

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setIsLoginModalVisible(false);
      const permissionLevel = localStorage.getItem('permissionLevel');
      if (permissionLevel === '1') {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    // Function to check screen size and set sidebar visibility
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarVisible(true); // Large screens (lg: 1024px and up)
      } else {
        setIsSidebarVisible(false); // Smaller screens
      }
    };

    // Check screen size on mount
    checkScreenSize();

    // Add event listener to handle window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalVisible(false);

    // Read the token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Log the token
    if (token) {
      const permissionLevel = localStorage.getItem('permissionLevel');
      if (permissionLevel === '1') {
        setIsAdmin(true);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin state on logout
    localStorage.clear(); // Clear localStorage on logout
    setIsLoginModalVisible(true); // Show login modal on logout
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="grid grid-cols-12">
      {!isLoggedIn && (
        <LoginModal isVisible={isLoginModalVisible} onClose={() => {}} onLogin={handleLogin} />
      )}
      {isLoggedIn && (
        <>
          <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
          {isSidebarVisible && <Sidebar/>}
          <main className={`p-4 ${isSidebarVisible ? 'col-span-10' : 'col-span-12'}`}>
            {children}
          </main>
        </>
      )}
    </div>
  );
}
