'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  const [statusApi, setStatusApi] = useState('Verificando...');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:3333/health')
      .then((res) => setStatusApi(res.data.message))
      .catch(() => setStatusApi('Erro ao conectar com a API'));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('auth');
    router.push('/login');
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-400">
          Dashboard
        </h1>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <p>
            <strong>Status da API:</strong> {statusApi}
          </p>
        </CardContent>
      </Card>
    </main>
  );
}