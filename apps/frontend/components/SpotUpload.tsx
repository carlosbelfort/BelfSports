'use client'
import { api } from '@/lib/api'
import { useState } from 'react'

/*interface SpotUploadProps {
  eventId: string
  onUpload: () => void
}*/

export default function SpotUpload({ spotId }: { spotId: string }) {
  const [file, setFile] = useState<File | null>(null);

  async function upload() {
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    await api.postForm(`/spots/${spotId}/photos`, form);
    alert("Foto enviada para moderação");
  }

  return (
    <>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={upload}>Enviar</button>
    </>
  );
}