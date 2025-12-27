'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function NewSpotPage() {
  const [imageUrl, setImageUrl] = useState('')
  const [eventId, setEventId] = useState('')

  async function submit() {
    await api.post('/spots', { imageUrl, eventId })
    alert('Spot enviado para moderação')
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Enviar Spot</h1>

      <input
        placeholder="URL da imagem"
        onChange={e => setImageUrl(e.target.value)}
        className="input"
      />

      <input
        placeholder="ID do evento"
        onChange={e => setEventId(e.target.value)}
        className="input mt-2"
      />

      <button onClick={submit} className="btn mt-4">
        Enviar
      </button>
    </div>
  )
}