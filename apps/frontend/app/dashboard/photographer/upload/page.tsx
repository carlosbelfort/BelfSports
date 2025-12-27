'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function UploadSpotPage() {
  const [file, setFile] = useState<File | null>(null)
  const [eventId, setEventId] = useState('')

  async function submit() {
    if (!file) return alert('Selecione uma imagem')

    const formData = new FormData()
    formData.append('image', file)
    formData.append('eventId', eventId)

    await api('/spots', {
      method: 'POST',
      body: formData,
    })

    alert('Imagem enviada para moderação')
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Upload de Foto</h1>

      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
      />

      <input
        placeholder="ID do evento"
        onChange={e => setEventId(e.target.value)}
        className="block mt-4 p-2 bg-zinc-900 border"
      />

      <button
        onClick={submit}
        className="mt-4 bg-green-600 px-4 py-2 rounded"
      >
        Enviar
      </button>
    </div>
  )
}