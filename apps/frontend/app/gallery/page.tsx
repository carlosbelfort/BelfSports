"use client";

import { useEffect, useState } from "react";

export default function PublicGallery() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/gallery")
      .then((res) => res.json())
      .then(setPhotos);
  }, []);

  return (
    <div>
      <h1>Galeria Pública</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={`http://localhost:3333/uploads/${photo.filename}`}
              width={250}
            />
            <p>{photo.spot.event.title}</p>
            <small>{photo.spot.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
}