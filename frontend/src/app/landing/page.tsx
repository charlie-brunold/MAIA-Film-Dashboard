'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const creatorsRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Apply parallax effect to elements
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      
      if (phoneRef.current) {
        phoneRef.current.style.transform = `translateY(${-scrollY * 0.05}px)`;
      }
      
      if (toolsRef.current) {
        toolsRef.current.style.transform = `translateX(${-scrollY * 0.08}px)`;
        toolsRef.current.style.opacity = `${1 - scrollY * 0.002}`;
      }
      
      if (creatorsRef.current) {
        creatorsRef.current.style.transform = `translateX(${scrollY * 0.08}px)`;
        creatorsRef.current.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-950 to-indigo-900"
        ref={parallaxRef}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, #0a0639 20px, #0a0639 40px)',
          backgroundSize: '56px 56px',
          opacity: 0.9
        }}></div>
        
        {/* Floating elements */}
        <div className="absolute w-20 h-20 bg-indigo-700 rounded-full opacity-20 top-1/4 left-1/4 animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute w-12 h-12 bg-indigo-600 rounded-full opacity-20 top-3/4 left-1/3 animate-[float_6s_ease-in-out_infinite_1s]"></div>
        <div className="absolute w-16 h-16 bg-red-500 rounded-full opacity-10 top-1/2 right-1/4 animate-[float_9s_ease-in-out_infinite_0.5s]"></div>
        <div className="absolute w-24 h-24 bg-blue-600 rounded-full opacity-10 bottom-1/4 right-1/3 animate-[float_7s_ease-in-out_infinite_1.5s]"></div>
      </div>
      
      {/* Banner text */}
      <div className="relative z-10 w-full bg-red-600 py-2 text-white text-center font-mono tracking-wider overflow-hidden">
        <div className="whitespace-nowrap inline-block animate-[marquee_15s_linear_infinite]">
          CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND *
        </div>
        <div className="whitespace-nowrap inline-block animate-[marquee_15s_linear_infinite] absolute top-0 left-full py-2">
          CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND * CINEMATIC INTELLIGENCE ON DEMAND *
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 pt-12 pb-24">
        {/* Logo */}
        <div className="bg-black text-white py-6 px-12 rounded-xl mb-12 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight tracking-widest">
            ROBIN'S<br/>
            <span className="border-t-2 pt-2 border-white">CUT</span>
          </h1>
        </div>
        
        {/* Phone mockup */}
        <div 
          ref={phoneRef}
          className="relative w-64 h-auto mb-12 transform transition-all duration-700 hover:scale-105"
        >
          <div className="relative mx-auto" style={{ maxWidth: '280px' }}>
            {/* Phone frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-black">
              {/* App Interface */}
              <div className="bg-white pt-8 pb-1 px-2 aspect-[9/19]">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 6L8 12L14 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* App Buttons */}
                <div className="space-y-4 px-4">
                  <Link 
                    href="/scriptwriter" 
                    className="block w-full py-3 border-2 border-green-500 text-green-600 rounded-full text-center font-medium hover:bg-green-50 transition-colors"
                  >
                    SCRIPT WRITER
                  </Link>
                  
                  <Link 
                    href="/analysis" 
                    className="block w-full py-3 border-2 border-blue-500 text-blue-600 rounded-full text-center font-medium hover:bg-blue-50 transition-colors"
                  >
                    ROI ANALYSIS
                  </Link>
                  
                  <Link 
                    href="/budget" 
                    className="block w-full py-3 border-2 border-blue-800 text-blue-800 rounded-full text-center font-medium hover:bg-blue-50 transition-colors"
                  >
                    BUDGET CALCULATOR
                  </Link>
                  
                  <Link 
                    href="/storyboard" 
                    className="block w-full py-3 border-2 border-red-500 text-red-600 rounded-full text-center font-medium hover:bg-red-50 transition-colors"
                  >
                    STORYBOARD GENERATOR
                  </Link>
                  
                  <Link 
                    href="/dashboard" 
                    className="block w-full py-3 bg-indigo-600 text-white rounded-full text-center font-medium hover:bg-indigo-700 transition-colors mt-8"
                  >
                    START PROJECT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI-POWERED TOOLS and FOR CREATORS */}
        <div className="w-full flex justify-between items-center mt-8 font-mono text-white text-xl md:text-3xl tracking-widest px-4">
          <div ref={toolsRef} className="transform transition-all duration-700">
            AI-POWERED TOOLS
          </div>
          <div ref={creatorsRef} className="transform transition-all duration-700">
            FOR CREATORS
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p>&copy; 2025 ROBIN'S CUT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}