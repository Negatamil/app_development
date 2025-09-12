import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import NotificationPanel from '../Notifications/NotificationPanel';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Notification Panel */}
      <NotificationPanel />
    </div>
  );
};

export default Layout;
