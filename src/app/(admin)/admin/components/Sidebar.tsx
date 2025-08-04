'use client'; // required when using usePathname in a component

import React from 'react';
import { X, Upload, LogOut, Image } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface sidebarValues {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: sidebarValues) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const sidebarItems = [
    { icon: Image, label: 'Add to gallery', href: '/admin/dashboard' },
    { icon: Upload, label: 'Upload blog', href: '/admin/blog' },
    { icon: Upload, label: 'Add Client Project', href: '/admin/add-client-project' },
    { icon: Upload, label: 'Add Testimonial', href: '/admin/testimonial' },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });

      if (res.ok) {
        router.push('/admin-login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed left-20 top-20 bg-black bg-opacity-50 z-99 lg:hidden "
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-black border-r border-yellow-400 transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 pt-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold text-yellow-400">Admin Panel</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <a
                key={index}
                href={item.href}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-yellow-400 text-black font-medium'
                    : 'text-yellow-100 hover:bg-yellow-400 hover:text-black hover:translate-x-2'
                }`}
              >
                <IconComponent size={20} className="mr-3" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-4 right-4">
          <div
            onClick={handleLogout}
            className="text-yellow-100 hover:bg-yellow-400 hover:text-black hover:translate-x-2 flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 hover:cursor-pointer"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
