// src/components/layout/CinematicNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function CinematicNavbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Script Writer', path: '/scriptwriter' },
    { name: 'Storyboard', path: '/storyboard' },
    { name: 'Budget', path: '/budget' },
    { name: 'Analysis', path: '/analysis' },
  ];

  return (
    <>
      {/* Banner text */}
      <div className="relative z-50 w-full bg-robins-red-600 py-2 text-white text-center font-mono tracking-wider overflow-hidden">
        <div className="whitespace-nowrap inline-block animate-marquee">
          CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND *
        </div>
        <div className="whitespace-nowrap inline-block animate-marquee absolute top-0 left-full py-2">
          CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND *
        </div>
      </div>
    
      <nav className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-white mr-2">ROBIN'S</div>
              <div className="text-2xl font-bold text-white">CUT</div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      href={link.path}
                      className={`text-sm font-medium ${
                        pathname === link.path 
                          ? 'text-white border-b-2 border-white' 
                          : 'text-gray-300 hover:text-white'
                      } transition-colors`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* User dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center focus:outline-none"
                    >
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.username} 
                          className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-robins-red-600 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.username?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="ml-2 hidden md:block text-white">{user.username}</span>
                      <svg className="h-5 w-5 ml-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 animate-fade-in">
                        <div className="py-1">
                          <Link 
                            href="/profile" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setShowDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="px-4 py-2 rounded-full bg-robins-red-600 text-white text-sm font-medium hover:bg-robins-red-700 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`block px-3 py-2 rounded-md ${
                        pathname === link.path
                          ? 'bg-robins-navy-800 text-white'
                          : 'text-gray-300 hover:bg-robins-navy-700 hover:text-white'
                      } text-base font-medium`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-robins-navy-700 hover:text-white text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-robins-navy-700 hover:text-white text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-robins-navy-700 hover:text-white text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md bg-robins-red-600 text-white text-base font-medium hover:bg-robins-red-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}