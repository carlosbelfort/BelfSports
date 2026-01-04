"use client";

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function PhotographerDashboard() {

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'PHOTOGRAPHER')) {
      router.push('/login')
    }
  }, [user, loading])

  if (loading) return null

  return (
    <DashboardLayout>
    <div>
      <h1 className="text-2xl mb-6">Painel do Fotógrafo</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/photographer/spots"
          className="bg-zinc-900 p-6 rounded"
        >
          Spots
        </Link>

        <Link
          href="/dashboard/photographer/spots"
          className="bg-zinc-900 p-6 rounded"
        >
          Minhas Fotos (Spots)
        </Link>
      </div>
    </div>
    </DashboardLayout>
  );
}