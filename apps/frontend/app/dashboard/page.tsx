'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import AdminDashboard from './admin/page'
import OrganizerDashboard from './organizer/page'
import UserDashboard from './user/page'

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')

    if (!token || !userRole) {
      router.push('/login')
      return
    }

    setRole(userRole)
  }, [router])

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Carregando dashboard...
      </div>
    )
  }

  switch (role) {
    case 'ADMIN':
      return <AdminDashboard />

    case 'ORGANIZER':
      return <OrganizerDashboard />

    default:
      return <UserDashboard />
  }
}
