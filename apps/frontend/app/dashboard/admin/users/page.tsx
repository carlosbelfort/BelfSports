'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

type User = {
  id: string
  email: string
  role: 'USER' | 'ORGANIZER' | 'ADMIN'
  active: boolean
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  async function loadUsers() {
    const response = await api.get('/admin/users')
    setUsers(response.data)
    setLoading(false)
  }

  async function changeRole(id: string, role: string) {
    await api.patch(`/admin/users/${id}/role`, { role })
    loadUsers()
  }

  async function toggleStatus(id: string, active: boolean) {
    await api.patch(`/admin/users/${id}/status`, { active: !active })
    loadUsers()
  }

  async function removeUser(id: string) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return
    await api.delete(`/admin/users/${id}`)
    loadUsers()
  }

  useEffect(() => {
    loadUsers()
  }, [])

  if (loading) return <p>Carregando usuários...</p>

  return (
    <div>
      <h1 className="text-2xl mb-6">Gerenciar Usuários</h1>

      <table className="w-full text-sm border border-zinc-800">
        <thead className="bg-zinc-900">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-zinc-800">
              <td className="p-2">{user.email}</td>

              <td className="p-2">
                <select
                  value={user.role}
                  onChange={e => changeRole(user.id, e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 p-1 rounded"
                >
                  <option value="USER">USER</option>
                  <option value="ORGANIZER">ORGANIZER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>

              <td className="p-2">
                {user.active ? 'Ativo' : 'Bloqueado'}
              </td>

              <td className="p-2 flex gap-2">
                <button
                  onClick={() => toggleStatus(user.id, user.active)}
                  className="text-yellow-400"
                >
                  {user.active ? 'Bloquear' : 'Ativar'}
                </button>

                <button
                  onClick={() => removeUser(user.id)}
                  className="text-red-500"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}