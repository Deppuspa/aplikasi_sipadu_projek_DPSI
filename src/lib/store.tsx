'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, Role } from './types';
import { authenticate, registerAccount, initMockData } from './mock-data';

interface RegisterData {
  role: Role;
  email: string;
  password: string;
  namaLengkap?: string;
  nis?: string;
  jenisKelamin?: string;
  idKelas?: string;
  namaGuru?: string;
  mataPelajaran?: string;
  namaAdmin?: string;
  username?: string;
}

interface AppState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  error: string;
  clearError: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    initMockData();
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const u = authenticate(email, password);
    if (u) { setUser(u); setError(''); return true; }
    setError('Email atau password salah.');
    return false;
  }, []);

  const register = useCallback((data: RegisterData): { success: boolean; error?: string } => {
    const u = registerAccount(data);
    if (u) {
      setUser(u);
      setError('');
      return { success: true };
    }
    const err = 'Email sudah terdaftar. Gunakan email lain.';
    setError(err);
    return { success: false, error: err };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return (
    <AppContext.Provider value={{ user, login, register, logout, error, clearError }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
