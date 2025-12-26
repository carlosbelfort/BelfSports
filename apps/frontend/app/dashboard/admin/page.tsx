/*'use client'

import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'

export default function AdminDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== 'ADMIN') redirect('/login')

  return (
    <div>
      <h1 className="text-2xl mb-6">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
      </div>
    </div>
  )
}*/

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
//import DashboardLayout from '@/components/DashboardLayout'

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) return null

  return (
    <main>
      <h1 className="text-2xl mb-6">Painel Administrativo</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Quod in dolorem delectus alias eaque, eos sit mollitia quisquam culpa ipsa, 
        dolore consequuntur suscipit doloremque inventore dolorum quae aut, repellat temporibus.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* cards administrativos */}
      </div>
    </main>
  )
}