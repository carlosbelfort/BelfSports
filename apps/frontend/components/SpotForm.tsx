"use client";
import { useState } from "react";
import { api } from "@/lib/api";

interface Props {
  eventId?: string;
  onSuccess?: () => void;
}

export default function SpotForm({ eventId, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    if (eventId) formData.append("eventId", eventId);

    await api("/spots", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar Spot</button>
    </form>
  );
}