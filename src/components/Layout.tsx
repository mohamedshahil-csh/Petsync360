import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Handle window resize to toggle isDesktop state
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On desktop, sidebar is open by default
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  return (
    <div className="flex bg-gray-900  min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isDesktop={isDesktop}
      />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 relative`}
        style={{
          marginLeft: isDesktop ? (isSidebarOpen ? 256 : 64) : 0,
        }}
      >
        {/* TopBar with hamburger menu on mobile */}
        <TopBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDesktop={isDesktop}
        />

        <main
          className="pt-16 py-2 bg-gray-100 min-h-screen"
          style={{ overflowX: 'hidden' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
