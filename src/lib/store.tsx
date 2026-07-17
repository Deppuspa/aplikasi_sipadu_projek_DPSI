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
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  error: string;
  clearError: () => void;
  refreshKey: number;
  refreshData: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  useEffect(() => {
    initMockData().then(refreshData);
  }, [refreshData]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const u = await authenticate(email, password);
    if (u) { setUser(u); setError(''); return true; }
    setError('Email atau password salah.');
    return false;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const result = await registerAccount(data);
    if (result.user) {
      setUser(result.user);
      setError('');
      return { success: true };
    }
    const err = result.error || 'Email sudah terdaftar. Gunakan email lain.';
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
    <AppContext.Provider value={{ user, login, register, logout, error, clearError, refreshKey, refreshData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
