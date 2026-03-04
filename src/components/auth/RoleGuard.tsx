import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, ROLE_PATHS } from '@/types/school';

interface RoleGuardProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    // Redirect to their own dashboard — strict black box
    return <Navigate to={ROLE_PATHS[user.role]} replace />;
  }

  return <>{children}</>;
}
