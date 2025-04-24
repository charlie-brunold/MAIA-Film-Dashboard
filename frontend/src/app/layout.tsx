// frontend/src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import CinematicLayout from '../components/layout/CinematicLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Robin's Cut | Cinematic Intelligence On Demand",
  description: 'AI-powered film production tools for filmmakers and creators',
  keywords: 'film, movie, production, AI, scriptwriting, storyboard, budget, analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts for Roboto Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <CinematicLayout>{children}</CinematicLayout>
      </body>
    </html>
  );
}