"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";
import DashboardLayout from "@/components/DashboardLayout";
import { Spot } from "@/types/spot";

/*export default function PhotographerSpotsPage() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    api("/spots").then(setSpots);
  }, []);

  return (
    <DashboardLayout>
    <div>
      <h1 className="text-2xl mb-6">Spots Disponíveis</h1>
      <SpotList spots={spots} />
    </div>
    </DashboardLayout>
  );
}*/

export default function PhotographerSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    api("/spots").then(setSpots);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl mb-6">Spots Disponíveis</h1>
      <SpotList spots={spots} role="PHOTOGRAPHER" />
    </DashboardLayout>
  );
}