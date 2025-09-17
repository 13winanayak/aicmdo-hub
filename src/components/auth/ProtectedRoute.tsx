import { Navigate } from 'react-router-dom';
import { useDashboardStore } from '@/store/dashboardStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useDashboardStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}