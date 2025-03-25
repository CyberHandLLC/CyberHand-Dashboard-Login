
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { userRole, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to role-specific dashboard
  switch (userRole) {
    case 'ADMIN':
      return <Navigate to="/admin/dashboard" replace />;
    case 'STAFF':
      return <Navigate to="/staff/dashboard" replace />;
    case 'CLIENT':
      return <Navigate to="/client/dashboard" replace />;
    case 'OBSERVER':
      return <Navigate to="/observer/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}
