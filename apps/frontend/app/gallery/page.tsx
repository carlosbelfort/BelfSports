'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function GalleryPage() {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    api('/spots/approved').then(res => setSpots(res.data))
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {spots.map((spot: any) => (
        <img key={spot.id} src={spot.imageUrl} className="rounded" />
      ))}
    </div>
  )
}