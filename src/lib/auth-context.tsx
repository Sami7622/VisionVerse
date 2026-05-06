'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { api } from '@/src/api/client';
import type { User, LoginPayload, RegisterPayload } from '@/src/api/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.user.getProfile();
      if (response.data) {
        setUser(response.data);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      // In a real app, check for JWT token and validate
      const hasToken = typeof window !== 'undefined' && localStorage.getItem('visionverse_token');
      if (hasToken) {
        await refreshUser();
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [refreshUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await api.auth.login(payload);
    
    if (response.error) {
      return { success: false, error: response.error.message };
    }
    
    if (response.data) {
      setUser(response.data.user);
      localStorage.setItem('visionverse_token', response.data.token);
      return { success: true };
    }
    
    return { success: false, error: 'Unknown error' };
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await api.auth.register(payload);
    
    if (response.error) {
      return { success: false, error: response.error.message };
    }
    
    if (response.data) {
      setUser(response.data.user);
      localStorage.setItem('visionverse_token', response.data.token);
      return { success: true };
    }
    
    return { success: false, error: 'Unknown error' };
  }, []);

  const logout = useCallback(async () => {
    await api.auth.logout();
    setUser(null);
    localStorage.removeItem('visionverse_token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
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
