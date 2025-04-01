'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initiateOAuthFlow: (provider: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from local storage
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      
      setIsInitialized(true);
    };
    
    checkAuth();
    
    // Handle OAuth redirects
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const provider = urlParams.get('provider');
    
    if (code && provider) {
      handleOAuthCallback(code, provider);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be a fetch call to your backend
      // Example:
      // const response = await fetch('http://localhost:5000/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (mock validation)
      if (email !== 'demo@example.com' && password !== 'password') {
        // For demo, allow any credentials
      }
      
      const mockUser = {
        id: 1,
        username: email.split('@')[0],
        email: email,
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      router.push('/dashboard');
      
    } catch (err) {
      setError('Failed to login. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const initiateOAuthFlow = (provider: string) => {
    let authUrl;
    
    if (provider === 'google') {
      // Replace with your actual Google OAuth configuration
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id';
      const redirectUri = `${window.location.origin}/login`;
      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&state=google`;
    } else if (provider === 'github') {
      // Replace with your actual GitHub OAuth configuration
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'your-github-client-id';
      const redirectUri = `${window.location.origin}/login`;
      authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email&state=github`;
    }
    
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  const handleOAuthCallback = async (code: string, provider: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // In a real implementation, you would send the code to your backend
      // Example:
      // const response = await fetch(`http://localhost:5000/api/auth/${provider}/callback`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code })
      // });
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 1,
        username: provider === 'google' ? 'googleuser' : 'githubuser',
        email: `${provider}user@example.com`,
        provider: provider,
        avatar: provider === 'google' 
          ? 'https://lh3.googleusercontent.com/a/default-user' 
          : 'https://avatars.githubusercontent.com/u/default'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      router.push('/dashboard');
      
    } catch (err) {
      setError(`Failed to authenticate with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      login, 
      logout, 
      initiateOAuthFlow,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}