'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'


export default function OrganizerDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user?.role !== 'ORGANIZER') {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Carregando dashboard...
      </div>
    )
  }

  return (
    <DashboardLayout>
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Dashboard do Organizador
      </h1>

      <p className="mt-2 text-gray-600">
        Bem-vindo! Aqui você gerencia seus eventos.
      </p>
    </main>
    </DashboardLayout>
    
  );
}

