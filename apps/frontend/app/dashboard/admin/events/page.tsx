


'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function UsersPage() {
  const [users, setEvents] = useState([])

  useEffect(() => {
    api.get('/admin/events').then(res => setEvents(res.data))
  }, [])
  return (
    <div>
      <h1 className="text-2xl mb-6">Gerenciar Eventos</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>Promover</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
