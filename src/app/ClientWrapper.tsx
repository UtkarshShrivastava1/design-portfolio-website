// src/app/ClientWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './user/components/Navbar';
import Footer from './user/components/Footer';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/admin-login');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
         {!isAdminRoute && <Footer/>}
    </>
  );
}
