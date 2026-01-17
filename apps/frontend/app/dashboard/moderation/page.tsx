"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import ImageZoomModal from "@/components/image-zoom-modal";

export default function ModerationPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const router = useRouter();

  function load() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/moderation/photos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPhotos);
  }

  useEffect(load, []);

  async function approve(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/moderation/photos/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    load();
  }

  async function reject(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/moderation/photos/${id}/reject`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    load();
  }

  return (
    <div className="p-6">
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <h1 className="mb-6 text-2xl font-bold text-white">
        Moderação de Fotos
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo) => (
          <Card key={photo.id}>
            {/* Imagem com zoom */}
            <div
              className="
                mb-4
                cursor-zoom-in
                overflow-hidden
                rounded-lg
              "
              onClick={() =>
                setZoomImage(
                  `${process.env.NEXT_PUBLIC_API_URL}/uploads/${photo.filename}`
                )
              }
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${photo.filename}`}
                className="
                  h-56
                  w-full
                  object-cover
                  transition
                  hover:scale-105
                "
              />
            </div>

            {/* Info */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-white">
                {photo.spot.name}
              </p>
              <p className="text-xs text-white/70">
                {photo.spot.event.title}
              </p>
            </div>

            {/* Ações */}
            <div className="flex gap-3">
              <Button variant="success" onClick={() => approve(photo.id)}>
                Aprovar
              </Button>
              <Button variant="danger" onClick={() => reject(photo.id)}>
                Rejeitar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de zoom */}
      {zoomImage && (
        <ImageZoomModal
          src={zoomImage}
          onClose={() => setZoomImage(null)}
        />
      )}
    </div>
  );
}
