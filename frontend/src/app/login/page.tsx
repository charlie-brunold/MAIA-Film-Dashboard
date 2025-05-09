'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'google', or 'github'
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, initiateOAuthFlow, isLoading, error, isAuthenticated } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
    
    // Check for registration success message
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setRegistrationSuccess(true);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSocialLogin = (provider: string) => {
    initiateOAuthFlow(provider);
  };

  // For demo purposes, allow direct navigation to dashboard
  const handleDemoLogin = () => {
    router.push('/dashboard');
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
              href="/register" 
              className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome back
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to continue your filmmaking journey
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
            {registrationSuccess && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">Registration successful! You can now sign in.</span>
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {/* Login tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setLoginMethod('email')}
                className={`pb-2 px-4 ${
                  loginMethod === 'email'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginMethod('google')}
                className={`pb-2 px-4 ${
                  loginMethod === 'google'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Google
              </button>
              <button
                onClick={() => setLoginMethod('github')}
                className={`pb-2 px-4 ${
                  loginMethod === 'github'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                GitHub
              </button>
            </div>

            {loginMethod === 'email' ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
                
                {/* Demo button - for development only */}
                <div>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Demo: Skip to Dashboard
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => handleSocialLogin(loginMethod)}
                  className={`w-full flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                    loginMethod === 'google'
                      ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      : 'border-gray-800 text-white bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {loginMethod === 'google' ? (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        />
                      </svg>
                      Sign in with Google
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        />
                      </svg>
                      Sign in with GitHub
                    </>
                  )}
                </button>
                
                {/* Demo button - for development only */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Demo: Skip to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer credit */}
      <footer className="relative z-10 py-4 text-center text-gray-500 text-sm">
        <p>© 2025 MAIA Entertainment. All rights reserved.</p>
      </footer>
    </div>
  );
}