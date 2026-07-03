'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useApp } from '@/lib/store';

export default function DashboardRedirect() {
  const router = useRouter();
  const { user } = useApp();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  return null;
}
