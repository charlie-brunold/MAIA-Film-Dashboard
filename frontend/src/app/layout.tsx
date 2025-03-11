// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MAIA Film Dashboard',
  description: 'A comprehensive toolkit for filmmakers to streamline the creative process',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* Your existing navigation */}
          {children}
          {/* Your existing footer */}
        </AuthProvider>
      </body>
    </html>
  );
}