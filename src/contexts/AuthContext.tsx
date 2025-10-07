'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, authApi, tokenManager } from '@/lib/auth';
import { message } from 'antd';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = tokenManager.getToken();
        const savedUser = tokenManager.getUser();

        if (token && savedUser) {
          // Verify token is still valid
          const result = await authApi.verifyToken(token);
          
          if (result.success && result.user) {
            setUser(result.user);
            tokenManager.setUser(result.user);
          } else {
            // Token is invalid, clear storage
            tokenManager.clear();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        tokenManager.clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await authApi.login(email, password);

      if (result.success && result.user && result.token) {
        setUser(result.user);
        tokenManager.setToken(result.token);
        tokenManager.setUser(result.user);
        message.success(result.message || 'Login successful');
        return true;
      } else {
        message.error(result.error || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authApi.logout();
      setUser(null);
      tokenManager.clear();
      message.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      tokenManager.clear();
    } finally {
      setLoading(false);
    }
  };

  const refreshAuth = async (): Promise<void> => {
    try {
      const token = tokenManager.getToken();
      
      if (!token) {
        setUser(null);
        return;
      }

      const result = await authApi.refreshToken(token);
      
      if (result.success && result.user && result.token) {
        setUser(result.user);
        tokenManager.setToken(result.token);
        tokenManager.setUser(result.user);
      } else {
        setUser(null);
        tokenManager.clear();
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      setUser(null);
      tokenManager.clear();
    }
  };

  // Auto-refresh token periodically
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshAuth();
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshAuth,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}