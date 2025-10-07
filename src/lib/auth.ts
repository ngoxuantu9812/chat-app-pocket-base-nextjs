// Authentication utilities and token management

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  permissions: string[];
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  message?: string;
}

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'admin@stonesolutions.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    avatar: '/images/admin-avatar.jpg',
    permissions: ['products:read', 'products:write', 'posts:read', 'posts:write', 'banners:read', 'banners:write', 'stones:read', 'stones:write', 'config:read', 'config:write'],
  },
  {
    id: '2',
    email: 'manager@stonesolutions.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'user' as const,
    avatar: '/images/manager-avatar.jpg',
    permissions: ['products:read', 'products:write', 'posts:read', 'posts:write', 'stones:read'],
  },
  {
    id: '3',
    email: 'editor@stonesolutions.com',
    password: 'editor123',
    name: 'Content Editor',
    role: 'user' as const,
    avatar: '/images/editor-avatar.jpg',
    permissions: ['posts:read', 'posts:write', 'banners:read'],
  },
];

// Token management
const TOKEN_KEY = 'stone_admin_token';
const USER_KEY = 'stone_admin_user';

export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// Authentication API simulation
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    // Generate a mock JWT token
    const token = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }));

    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      token,
      message: 'Login successful',
    };
  },

  logout: async (): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      message: 'Logout successful',
    };
  },

  verifyToken: async (token: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const decoded = JSON.parse(atob(token));
      
      // Check if token is expired
      if (decoded.exp < Date.now()) {
        return {
          success: false,
          error: 'Token expired',
        };
      }

      const user = mockUsers.find(u => u.id === decoded.userId);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        user: userWithoutPassword,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid token',
      };
    }
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const verifyResult = await authApi.verifyToken(token);
    
    if (!verifyResult.success || !verifyResult.user) {
      return verifyResult;
    }

    // Generate new token
    const newToken = btoa(JSON.stringify({
      userId: verifyResult.user.id,
      email: verifyResult.user.email,
      role: verifyResult.user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }));

    return {
      success: true,
      user: verifyResult.user,
      token: newToken,
      message: 'Token refreshed',
    };
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // This would typically validate the current password and update it
    return {
      success: true,
      message: 'Password changed successfully',
    };
  },
};

// Permission utilities
export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  if (user.role === 'admin') return true; // Admin has all permissions
  return user.permissions.includes(permission);
};

export const hasAnyPermission = (user: User | null, permissions: string[]): boolean => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return permissions.some(permission => user.permissions.includes(permission));
};

export const hasAllPermissions = (user: User | null, permissions: string[]): boolean => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return permissions.every(permission => user.permissions.includes(permission));
};