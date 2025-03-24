
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false
}) => {
  const { user, isAuthenticated, loading, checkAuthStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus();
      setIsChecking(false);
    };

    verifyAuth();
  }, [checkAuthStatus]);
  
  // Show loading spinner while checking authentication
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Redirect non-admin users from admin routes
  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If authenticated and passes role check, render children
  return <>{children}</>;
};

export default ProtectedRoute;
