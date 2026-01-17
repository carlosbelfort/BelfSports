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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`)
      .then((res) => res.json())
      .then((photos) => {
        const grouped = groupByEvent(photos);
        setEvents(grouped);
      });
  }, []);

  return (
    <main>
    <div className="p-6">
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <h1 className="flex justify-center mb-6 text-4xl font-serif font-bold">GALERIA DE FOTOS</h1>

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
    </main>
  );
}
