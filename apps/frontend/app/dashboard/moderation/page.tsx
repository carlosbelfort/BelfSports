"use client";


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
}
