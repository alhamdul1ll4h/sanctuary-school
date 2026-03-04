import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole, ROLE_PATHS } from '@/types/school';
import { authenticate } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('school_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username: string, password: string) => {
    const found = authenticate(username, password);
    if (found) {
      setUser(found);
      localStorage.setItem('school_user', JSON.stringify(found));
      return { success: true };
    }
    return { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('school_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
