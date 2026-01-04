'use client'
import { api } from '@/lib/api'
import { useState } from 'react'

interface SpotUploadProps {
  eventId: string
  onUpload: () => void
}

export default function SpotUpload({
  eventId,
  onUpload,
}: SpotUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  async function handleUpload() {
    if (!file || !eventId) return

    const formData = new FormData()
    formData.append('image', file)

    await api.postForm(`/spots/${eventId}/photos`, formData)

    onUpload()
  }

  return (
    <div className="my-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Enviar foto</button>
    </div>
  )
}