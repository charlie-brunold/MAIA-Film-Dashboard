'use client';

import { AuthProvider } from '../context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use useState and useEffect to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render children when component is mounted
  return (
    <html lang="en">
      <body className={inter.className}>
        {isMounted ? (
          <AuthProvider>{children}</AuthProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        )}
      </body>
    </html>
  );
}