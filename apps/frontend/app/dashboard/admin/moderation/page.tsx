'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function ModerationPage() {
  const [spots, setSpots] = useState([])

  async function load() {
    const res = await api.get('/admin/spots/pending')
    setSpots(res.data)
  }

  async function approve(id: string) {
    await api.patch(`/admin/spots/${id}/approve`)
    load()
  }

  async function reject(id: string) {
    await api.patch(`/admin/spots/${id}/reject`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl mb-6">Moderação de Spots</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {spots.map((spot: any) => (
          <div key={spot.id} className="border p-4 rounded">
            <img src={spot.imageUrl} className="rounded mb-2" />
            <p>Evento: {spot.event.title}</p>
            <p>Usuário: {spot.user.email}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => approve(spot.id)}
                className="text-green-500"
              >
                Aprovar
              </button>
              <button
                onClick={() => reject(spot.id)}
                className="text-red-500"
              >
                Rejeitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}