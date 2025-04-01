import React, { useState } from 'react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupMethod, setSignupMethod] = useState('email'); // 'email', 'google', or 'github'

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted', { email, password, name });
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Film strip element */}
        <div className="absolute -top-16 -right-16 w-64 h-96 border-8 border-indigo-900/10 border-dashed rounded-3xl transform rotate-12"></div>
        <div className="absolute top-1/4 -left-16 w-64 h-96 border-8 border-yellow-500/10 border-dashed rounded-3xl transform -rotate-12"></div>
        
        {/* Camera frames */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-8 border-indigo-600/20 rounded-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border-8 border-purple-600/20 rounded-full"></div>
        
        {/* Script elements */}
        <div className="absolute top-20 left-20 w-48 h-6 bg-gray-300/30 rounded"></div>
        <div className="absolute top-32 left-20 w-36 h-6 bg-gray-300/30 rounded"></div>
        <div className="absolute top-44 left-20 w-56 h-6 bg-gray-300/30 rounded"></div>
        
        {/* Storyboard frames */}
        <div className="absolute bottom-32 right-32 grid grid-cols-2 gap-4">
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
          <div className="w-16 h-12 bg-gray-300/30 rounded"></div>
        </div>
        
        {/* Colorful blobs */}
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 filter blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">MAIA</div>
              <div className="ml-2 text-sm text-gray-600">Film Dashboard</div>
            </a>
            <a 
              href="/login" 
              className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
            >
              Already have an account? Log in
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Join MAIA Film Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Unleash your creativity with our AI-powered filmmaking tools
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
            {/* Signup tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setSignupMethod('email')}
                className={`pb-2 px-4 ${
                  signupMethod === 'email'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setSignupMethod('google')}
                className={`pb-2 px-4 ${
                  signupMethod === 'google'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Google
              </button>
              <button
                onClick={() => setSignupMethod('github')}
                className={`pb-2 px-4 ${
                  signupMethod === 'github'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                GitHub
              </button>
            </div>

            {signupMethod === 'email' ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <button
                  className={`w-full flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                    signupMethod === 'google'
                      ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      : 'border-gray-800 text-white bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {signupMethod === 'google' ? (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        />
                      </svg>
                      Sign up with Google
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        />
                      </svg>
                      Sign up with GitHub
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs text-center text-gray-500">
                By signing up, you agree to our{' '}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer credit */}
      <footer className="relative z-10 py-4 text-center text-gray-500 text-sm">
        <p>© 2025 MAIA Entertainment. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignupPage;
