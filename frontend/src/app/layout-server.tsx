import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from './layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MAIA Film Dashboard',
  description: 'AI-powered film production tools for filmmakers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
