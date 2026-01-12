"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import SpotList from "@/components/SpotList";
import { Spot } from "@/types/spot";

export default function OrganizerSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const router = useRouter();

  useEffect(() => {
    api("/spots").then(setSpots);
  }, []);

  return (
    <main>
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <h1 className="text-2xl mb-6">Meus Spots</h1>
      <SpotList spots={spots} role="ORGANIZER" />
    </main>
  );
}
