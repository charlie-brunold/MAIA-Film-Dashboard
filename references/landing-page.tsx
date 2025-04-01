import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">MAIA</div>
            </div>
            <div className="flex">
              <a 
                href="/login" 
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Log in
              </a>
              <a 
                href="/signup" 
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Sign up for free
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col md:flex-row items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Left Side - Catchy Hook */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Transform your filmmaking process, 
            <span className="text-indigo-600"> from anywhere.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Escape the clutter and chaos—unleash your creativity with AI-powered scriptwriting, storyboarding, budgeting, and analysis tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium">
              Sign up - it's free!
            </button>
          </div>

          <div className="flex items-center">
            <a href="#demo" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch demo video
            </a>
          </div>
        </div>
        
        {/* Right Side - Trendy Graphic */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
            {/* Phone mockup */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-black">
              {/* Dashboard Preview Image */}
              <div className="bg-white pt-8 pb-1 px-2 aspect-[9/19]">
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Script Writer</div>
                    <div className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">AI-Powered</div>
                  </div>
                  <div className="bg-white rounded p-3 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">INT. COFFEE SHOP - DAY</div>
                    <div className="text-xs">Two characters sit across from each other...</div>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Storyboard</div>
                    <div className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">Visualize</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-gray-300 rounded aspect-video"></div>
                    <div className="bg-gray-300 rounded aspect-video"></div>
                    <div className="bg-gray-300 rounded aspect-video"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 pb-1 px-2 border-t">
                  <div className="flex gap-4">
                    <div className="text-xs text-gray-600">Home</div>
                    <div className="text-xs text-indigo-600">Tools</div>
                  </div>
                  <div className="text-xs text-gray-600">Menu</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div 
              className="absolute top-1/4 -right-16 w-32 h-32 bg-yellow-400 rounded-lg transform rotate-12 z-0 opacity-80"
              style={{ filter: 'blur(2px)' }}
            ></div>
            <div 
              className="absolute bottom-1/4 -left-16 w-32 h-32 bg-indigo-500 rounded-lg transform -rotate-12 z-0 opacity-80"
              style={{ filter: 'blur(2px)' }}
            ></div>
          </div>
        </div>
      </section>

      {/* Feature Demonstration Section */}
      <section id="demo" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Filmmaking Tools, Reimagined</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">AI Script Writer</h3>
                    <div className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">AI-Powered</div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 font-mono text-sm text-gray-800">
                  <div className="mb-2 text-gray-500">INT. COFFEE SHOP - DAY</div>
                  <div className="mb-4">
                    Two characters sit across from each other at a small table. The atmosphere is tense.
                  </div>
                  <div className="mb-1 font-bold">CHARACTER 1</div>
                  <div className="mb-3 text-gray-600">(nervously)</div>
                  <div className="mb-4">I've been meaning to talk to you about something.</div>
                  <div className="mb-1 font-bold">CHARACTER 2</div>
                  <div className="mb-3 text-gray-600">(suspicious)</div>
                  <div>What's this about?</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Write Professional Scripts with AI</h3>
              <p className="text-lg text-gray-600 mb-6">
                Turn your ideas into industry-standard screenplay format in seconds. Our AI assistant helps you craft compelling dialogue, descriptive action, and professional formatting.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Generate complete scenes from simple prompts</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Proper screenplay formatting automatically applied</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Export to industry-standard formats</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need to create your film</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Script Writer Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Script Writer</h3>
                <p className="text-gray-600 mb-4">Generate and refine scripts with AI assistance</p>
                <a href="/scriptwriter" className="text-indigo-600 font-medium hover:text-indigo-800">Learn more →</a>
              </div>
            </div>
            
            {/* Storyboard Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Storyboard</h3>
                <p className="text-gray-600 mb-4">Visualize your script with AI-generated scenes</p>
                <a href="/storyboard" className="text-indigo-600 font-medium hover:text-indigo-800">Learn more →</a>
              </div>
            </div>
            
            {/* Budget Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Budget Calculator</h3>
                <p className="text-gray-600 mb-4">Plan and estimate your film's budget accurately</p>
                <a href="/budget" className="text-indigo-600 font-medium hover:text-indigo-800">Learn more →</a>
              </div>
            </div>
            
            {/* ROI Analysis Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">ROI Analysis</h3>
                <p className="text-gray-600 mb-4">Predict success and analyze return on investment</p>
                <a href="/analysis" className="text-indigo-600 font-medium hover:text-indigo-800">Learn more →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your filmmaking process?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join innovative filmmakers who are using MAIA to streamline their creative process.
          </p>
          <a 
            href="/signup" 
            className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors"
          >
            Get started for free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold text-white mb-4">MAIA</div>
              <p className="max-w-xs text-gray-400">
                A comprehensive toolkit for filmmakers to streamline the creative process.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><a href="/scriptwriter" className="hover:text-white transition-colors">Script Writer</a></li>
                  <li><a href="/storyboard" className="hover:text-white transition-colors">Storyboard</a></li>
                  <li><a href="/budget" className="hover:text-white transition-colors">Budget Calculator</a></li>
                  <li><a href="/analysis" className="hover:text-white transition-colors">ROI Analysis</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/team" className="hover:text-white transition-colors">Team</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-gray-400 text-sm">
            <p>&copy; 2025 MAIA Entertainment. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
