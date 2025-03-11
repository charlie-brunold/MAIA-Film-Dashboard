// frontend/src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

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
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="text-xl font-bold">MAIA Film Dashboard</Link>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/scriptwriter" className="hover:text-gray-300">Script Writer</Link>
              <Link href="/storyboard" className="hover:text-gray-300">Storyboard</Link>
              <Link href="/budget" className="hover:text-gray-300">Budget</Link>
              <Link href="/analysis" className="hover:text-gray-300">Analysis</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-100 p-6 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2025 MAIA Entertainment Committee</p>
          </div>
        </footer>
      </body>
    </html>
  );
}