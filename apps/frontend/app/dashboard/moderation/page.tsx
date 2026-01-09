/*"use client";


import { useEffect, useState } from "react";

export default function ModerationPage() {
  const [photos, setPhotos] = useState<any[]>([]);

  function load() {
    fetch("http://localhost:3333/moderation/photos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPhotos);
  }

  useEffect(load, []);

  async function approve(id: string) {
    await fetch(`http://localhost:3333/moderation/photos/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    load();
  }

  async function reject(id: string) {
    await fetch(`http://localhost:3333/moderation/photos/${id}/reject`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    load();
  }

  return (
    
      <div>
        <h1>Moderação de Fotos</h1>

        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={`http://localhost:3333/uploads/${photo.filename}`}
              width={200}
            />
            <p>
              {photo.spot.name} — {photo.spot.event.title}
            </p>
            <button onClick={() => approve(photo.id)}>Aprovar</button>
            <button onClick={() => reject(photo.id)}>Rejeitar</button>
          </div>
        ))}
      </div>
    
  );
}*/

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function ModerationPage() {
  const [photos, setPhotos] = useState<any[]>([]);

  function load() {
    fetch("http://localhost:3333/moderation/photos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPhotos);
  }

  useEffect(load, []);

  async function approve(id: string) {
    await fetch(`http://localhost:3333/moderation/photos/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    load();
  }

  async function reject(id: string) {
    await fetch(`http://localhost:3333/moderation/photos/${id}/reject`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    load();
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Moderação de Fotos
      </h1>

      {photos.length === 0 && (
        <p className="text-white/70">Nenhuma foto pendente.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo) => (
          <Card key={photo.id}>
            {/* Imagem */}
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={`http://localhost:3333/uploads/${photo.filename}`}
                alt="Foto enviada"
                className="h-56 w-full object-cover transition hover:scale-105"
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
    </div>
  );
}
