"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import SpotList from "@/components/SpotList";
import { Spot } from "@/types/spot";

/*export default function OrganizerSpotsPage() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    api("/spots").then(setSpots);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl mb-6">Meus Spots</h1>
      <SpotList spots={spots} />
    </DashboardLayout>
  );
}*/

export default function OrganizerSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    api("/spots").then(setSpots);
  }, []);

  return (
    <main>
      <h1 className="text-2xl mb-6">Meus Spots</h1>
      <SpotList spots={spots} role="ORGANIZER" />
    </main>
  );
}
