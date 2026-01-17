"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageZoomModal from "@/components/image-zoom-modal";
import { Button } from "@/components/Button";

export default function SpotGalleryPage() {
  const { spotId } = useParams();
  const [spotName, setSpotName] = useState<string>("");
  const [photos, setPhotos] = useState<any[]>([]);
  const [zoom, setZoom] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p: any) => p.spot.id === spotId);

        setPhotos(filtered);

        if (filtered.length > 0) {
          setSpotName(filtered[0].spot.name);
        }
      });
  }, [spotId]);

  return (
    <div className="p-6">
      <Button variant="gray"
        onClick={() => router.back()}
      >
        ← Voltar
      </Button>
      <h1 className="mb-6 text-2xl font-bold">{spotName || "Fotos do Spot"}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${photo.filename}`}
            className="
              cursor-zoom-in
              rounded-lg
              object-cover
              h-56
              w-full
              hover:opacity-90
            "
            onClick={() =>
              setZoom(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${photo.filename}`)
            }
          />
        ))}
      </div>

      {zoom && <ImageZoomModal src={zoom} onClose={() => setZoom(null)} />}
    </div>
  );
}
