"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";
import { Button } from "@/components/Button";
import { Spot } from "@/types/spot";

export default function PhotographerSpotsPage() {
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
      <h1 className="text-2xl mb-6">Spots Disponíveis</h1>
      <SpotList spots={spots} role="PHOTOGRAPHER" />
    </main>
  );
}
