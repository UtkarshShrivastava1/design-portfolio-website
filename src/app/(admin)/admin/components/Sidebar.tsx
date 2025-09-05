'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  X,
  Upload,
  LogOut,
  Image as ImageIcon, // <- Lucide image icon (aliased)
  type LucideIcon,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    { icon: ImageIcon, label: 'Add to gallery', href: '/admin/dashboard' },
    { icon: Upload, label: 'Upload blog', href: '/admin/blog' },
    { icon: Upload, label: 'Add Client Project', href: '/admin/add-client-project' },
    { icon: Upload, label: 'Add Testimonial', href: '/admin/testimonial' },
    { icon: Upload, label: 'Add Videos', href: '/admin/videos' },
    { icon: Upload, label: 'Add Projects', href: '/admin/projects' },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) router.push('/admin-login');
      else console.error('Logout failed');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-400 transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 pt-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center flex-col p-1 mb-10">
          <Image
            src="/SOCH_WHITE.png"
            alt="SOCH Labs Logo"
            width={120}
            height={80}
            priority
          />
          <h2 className="text-xs font-bold text-gray-400">Sochlabs.in</h2>
          <button
            onClick={toggleSidebar}
            className="mt-2 lg:hidden text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  // close sidebar on mobile when navigating
                  if (isOpen) toggleSidebar();
                }}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-gray-100 hover:bg-white hover:text-black hover:translate-x-2'
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-100 hover:bg-white hover:text-black hover:translate-x-2 flex items-center px-4 py-3 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
