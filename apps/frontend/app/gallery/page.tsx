/*"use client";

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
}*/

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Link from "next/link";

function groupByEvent(photos: any[]) {
  const map: Record<string, any> = {};

  photos.forEach((photo) => {
    const event = photo.spot.event;

    if (!map[event.id]) {
      map[event.id] = {
        event,
        photos: [],
      };
    }

    map[event.id].photos.push(photo);
  });

  return Object.values(map);
}

export default function PublicGallery() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3333/gallery")
      .then((res) => res.json())
      .then((photos) => {
        const grouped = groupByEvent(photos);
        setEvents(grouped);
      });
  }, []);

  return (
    <div className="p-6">
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <h1 className="mb-6 text-2xl font-bold">Eventos</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(({ event }) => (
          <Link key={event.id} href={`/gallery/${event.id}`}>
            <Card title={event.title}>
              <p className="text-sm opacity-80">Clique para ver os spots</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
