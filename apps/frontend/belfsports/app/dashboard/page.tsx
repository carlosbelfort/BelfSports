'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (!auth) {
      router.push('/login');
    }
  }, [router]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Bem-vindo ao sistema.</p>
    </main>
  );
}
