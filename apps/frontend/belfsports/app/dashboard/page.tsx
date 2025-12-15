'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [statusApi, setStatusApi] = useState('Verificando...');

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (!auth) {
      router.push('/login');
      return;
    }

    async function checkApi() {
      try {
        const response = await axios.get('http://localhost:3333/health');
        setStatusApi(response.data.message);
      } catch {
        setStatusApi('Erro ao conectar com a API');
      }
    }

    checkApi();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('auth');
    router.push('/login');
  }  
  

  return (
    <main className="p-6">
        <div className="flex itens-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>

             <button 
                onClick={handleLogout}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Logout
             </button>

        </div>
     
      <p className="mt-4">
        <strong>Status da API:</strong> {statusApi}
      </p>
    </main>
  );
}
