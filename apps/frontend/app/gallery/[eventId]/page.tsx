"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

export default function EventSpotsPage() {
  const { eventId } = useParams();
  const [spots, setSpots] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3333/gallery")
      .then((res) => res.json())
      .then((photos) => {
        const filtered = photos.filter(
          (p: any) => p.spot.event.id === eventId
        );

        const map: Record<string, any> = {};
        filtered.forEach((p: any) => {
          if (!map[p.spot.id]) map[p.spot.id] = p.spot;
        });

        setSpots(Object.values(map));
      });
  }, [eventId]);

  return (
    <div className="p-6">
      <Button variant="gray"
              onClick={() => router.back()}
            >
              ← Voltar
            </Button>
      <h1 className="mb-6 text-2xl font-bold">Spots</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <Link
            key={spot.id}
            href={`/gallery/${eventId}/${spot.id}`}
          >
            <Card title={spot.name}>
              <p className="text-sm opacity-80">
                Ver fotos do spot
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}