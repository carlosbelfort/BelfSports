"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import SpotList from "@/components/SpotList";
import DashboardLayout from "@/components/DashboardLayout";
import { Spot } from "@/types/spot";


/*
export default function AdminSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);

  async function loadSpots() {
    const response = await api("/spots");
    setSpots(response);
  }

  async function updateStatus(id: string, status: string) {
    await api(`/spots/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    loadSpots();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este spot?")) return;
    await api(`/spots/${id}`, { method: "DELETE" });
    loadSpots();
  }

  useEffect(() => {
    loadSpots();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl mb-6">Moderação de Spots</h1>
        <SpotList
          spots={spots}
          role="ADMIN"
          onApprove={(id) => updateStatus(id, "APPROVED")}
          onReject={(id) => updateStatus(id, "REJECTED")}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
*/

export default function AdminSpotsPage() {
  const [spots, setSpots] = useState<Spot[]>([]);

  async function loadSpots() {
    const response = await api("/spots");
    setSpots(response);
  }

  async function updateStatus(id: string, status: Spot["status"]) {
    await api(`/spots/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    loadSpots();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este spot?")) return;
    await api(`/spots/${id}`, { method: "DELETE" });
    loadSpots();
  }

  useEffect(() => {
    loadSpots();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl mb-6">Moderação de Spots</h1>
      <SpotList
        spots={spots}
        role="ADMIN"
        onApprove={(id) => updateStatus(id, "APPROVED")}
        onReject={(id) => updateStatus(id, "REJECTED")}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}