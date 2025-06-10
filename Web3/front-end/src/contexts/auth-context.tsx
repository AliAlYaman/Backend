import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, Credentials } from '../types/auth-context-types';
import * as authApi from '../services/api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = async (credentials: Credentials) => {
  try {
    const data = await authApi.login(credentials);

    if (data.accessToken) {
      setAccessToken(data.accessToken);
      navigate('/');
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

  
  const refresh = async () => {
    const data = await authApi.refresh();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
    } else {
      setAccessToken(null);
    }
  };

  const logout = async () => {
    await authApi.logout();
    setAccessToken(null);
  };

  // Optional: refresh token when app loads
  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
