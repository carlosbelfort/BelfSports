"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";

export default function PhotographerSpotsPage() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    api("/spots").then(setSpots);
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-6">Spots Disponíveis</h1>
      <SpotList spots={spots} />
    </div>
  );
}