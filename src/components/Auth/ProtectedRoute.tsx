import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { Spinner } from "../Spinner";
import { UserRoles, type UserRole } from "../../types"; 

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole; 
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, refreshUser, user } = useAuth(); // Добавляем user из контекста
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const refreshAuth = async () => {
        try {
          setIsRefreshing(true);
          setError(null);
          await refreshUser();
        } catch (err) {
          console.error("Refresh failed:", err);
          setError("Session expired. Please log in again.");
        } finally {
          setIsRefreshing(false);
        }
      };
      
      refreshAuth();
    }
  }, [isAuthenticated, refreshUser]);

  if (isRefreshing) {
    return <Spinner message="Checking session..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <Navigate to="/login" state={{ from: location }} replace />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // проверка роли (добавлена после проверки аутентификации)
  if (requiredRole && user?.role) {
  const userRole = user.role as keyof typeof UserRoles;
  
  if (UserRoles[userRole] < UserRoles[requiredRole]) {
    return <Navigate to="/" replace />;
  }
}

  return <>{children}</>;
};