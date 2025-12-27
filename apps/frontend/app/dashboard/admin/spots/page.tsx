"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Spot = {
  id: string;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  event: { title: string };
  user: { name: string; email: string };
};

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
    <div>
      <h1 className="text-2xl mb-6">Moderação de Spots</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="border border-zinc-800 rounded p-3"
          >
            <img
              src={spot.imageUrl}
              className="rounded mb-2"
              alt="Spot"
            />

            <p className="text-sm">
              <strong>Evento:</strong> {spot.event.title}
            </p>
            <p className="text-sm">
              <strong>Fotógrafo:</strong> {spot.user.name}
            </p>
            <p className="text-sm mb-2">
              Status: <strong>{spot.status}</strong>
            </p>

            {spot.status === "PENDING" && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateStatus(spot.id, "APPROVED")
                  }
                  className="text-green-500"
                >
                  Aprovar
                </button>

                <button
                  onClick={() =>
                    updateStatus(spot.id, "REJECTED")
                  }
                  className="text-yellow-500"
                >
                  Rejeitar
                </button>
              </div>
            )}

            <button
              onClick={() => handleDelete(spot.id)}
              className="text-red-500 mt-2"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}