'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Spin, Result, Button } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, hasAnyPermission, User } from '@/lib/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
  requireAll?: boolean; // If true, user must have ALL permissions. If false, user needs ANY permission
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredPermissions = [],
  requireAll = false,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [loading, isAuthenticated, router, redirectTo]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  // Check permissions if required
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAll
      ? requiredPermissions.every(permission => hasPermission(user, permission))
      : hasAnyPermission(user, requiredPermissions);

    if (!hasRequiredPermissions) {
      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <div style={{ padding: '50px' }}>
          <Result
            status="403"
            title="Access Denied"
            subTitle="You don't have permission to access this page."
            extra={
              <Button type="primary" onClick={() => router.push('/admin')}>
                Go to Dashboard
              </Button>
            }
          />
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Higher-order component for page-level protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Permission-based component wrapper
interface PermissionWrapperProps {
  children: ReactNode;
  permission: string | string[];
  user: User | null;
  fallback?: ReactNode;
  requireAll?: boolean;
}

export function PermissionWrapper({
  children,
  permission,
  user,
  fallback = null,
  requireAll = false,
}: PermissionWrapperProps) {
  const permissions = Array.isArray(permission) ? permission : [permission];
  
  const hasRequiredPermissions = requireAll
    ? permissions.every(perm => hasPermission(user, perm))
    : hasAnyPermission(user, permissions);

  if (!hasRequiredPermissions) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Hook for checking permissions in components
export function usePermissions() {
  const { user } = useAuth();

  return {
    hasPermission: (permission: string) => hasPermission(user, permission),
    hasAnyPermission: (permissions: string[]) => hasAnyPermission(user, permissions),
    hasAllPermissions: (permissions: string[]) => 
      permissions.every(permission => hasPermission(user, permission)),
    user,
  };
}