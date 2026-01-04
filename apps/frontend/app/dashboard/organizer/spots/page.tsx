"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import DashboardLayout from "@/components/DashboardLayout";
import SpotList from "@/components/SpotList";

export default function OrganizerSpotsPage() {
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
}