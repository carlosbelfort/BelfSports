'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar() {
  const { user } = useAuth()
  //const [open, setOpen] = useState(false)

  if (!user) return null

  return (

    

    <aside className="w-64 flex flex-col gap-4 bg-[var(--color1)] p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>

      {user.role === 'ADMIN' && (
        <>
          <Link href="/dashboard/admin">Dashboard</Link>
          <Link href="/dashboard/admin/users">Usuários</Link>
          <Link href="/dashboard/admin/settings">Configurações</Link>
        </>
      )}

      {user.role === 'ORGANIZER' && (
        <>
          <Link href="/dashboard/organizer">Eventos</Link>
          <Link href="/dashboard/organizer/create">Criar Evento</Link>
        </>
      )}

      {user.role === 'PHOTOGRAPHER' && (
        <>
          <Link href="/dashboard/photographer">Dashboard</Link>
          <Link href="/dashboard/photographer/upload">Upload de Foto</Link>
        </>
      )}

      {user.role === 'USER' && (
        <>
          <Link href="/dashboard/user">Meus Eventos</Link>
          <Link href="/dashboard/user/profile">Perfil</Link>
        </>
      )}
    </aside>
  )
}