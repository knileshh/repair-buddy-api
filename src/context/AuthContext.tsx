
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import * as authService from '../services/auth';

interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if token is valid on initial load and route changes
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }
      
      const userData = authService.getCurrentUser();
      if (!userData) {
        authService.logout();
        return false;
      }
      
      setUser(userData);
      return true;
    } catch (err) {
      console.error('Auth status check failed:', err);
      authService.logout();
      return false;
    }
  };

  // Initialize auth state from localStorage and verify token
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        await checkAuthStatus();
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Redirect protected routes to login if not authenticated
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/repairs', '/repairs/new'];
    const adminRoutes = []; // Add admin-only routes here if needed
    
    const checkRouteAccess = async () => {
      // Skip checking during initial loading
      if (loading) return;
      
      const isAuthed = user !== null;
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname === route || location.pathname.startsWith(`${route}/`)
      );
      
      // Redirect to login if trying to access protected route while not authenticated
      if (isProtectedRoute && !isAuthed) {
        toast.error('Please log in to access this page');
        navigate('/login', { state: { from: location.pathname } });
      }
    };
    
    checkRouteAccess();
  }, [location.pathname, user, loading, navigate]);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      
      // Redirect to dashboard or previous route if available
      const from = (location.state as any)?.from || '/dashboard';
      navigate(from);
      toast.success('Login successful');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register({ email, password });
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully');
  };
  
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    checkAuthStatus,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
