"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Card from "@/components/Card";

export default function UploadPhotoPage() {
  const [spots, setSpots] = useState<any[]>([]);
  const [spotId, setSpotId] = useState("");
  //const [files, setFiles] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3333/spots", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setSpots);
  }, []);

  async function handleUpload() {
    if (!files.length || !spotId) return;

    try {
      setLoading(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("photos", file);
      });

      const res = await fetch(
        `http://localhost:3333/photos/spots/${spotId}/photo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      alert("Fotos enviadas para aprovação!");
      setFiles([]);
      setSpotId("");
    } catch (err: any) {
      alert(err.message || "Erro ao enviar fotos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Button variant="gray" onClick={() => router.back()}>
        ← Voltar
      </Button>
      <Card>
        <h1 className="text-xl font-semibold mb-2">Upload de Foto</h1>

        <p className="text-sm opacity-80 mb-6">
          Selecione um spot aprovado e envie sua foto para moderação.
        </p>

        {/* Spot */}
        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium">Spot</label>

          <select
            value={spotId}
            onChange={(e) => setSpotId(e.target.value)}
            className="
                w-full
                px-3
                py-2
                rounded-md
                border
                border-white/20
                bg-transparent
                focus:outline-none
                focus:ring-2
                focus:ring-white/30
              "
          >
            <option value="">Selecione o spot</option>
            {spots.map((spot) => (
              <option key={spot.id} value={spot.id} className="text-black">
                {spot.name} — {spot.event.title}
              </option>
            ))}
          </select>
        </div>

        {/* Upload */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Foto</label>

          <label
            htmlFor="file"
            className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                p-6
                border-2
                border-dashed
                border-white/30
                rounded-lg
                cursor-pointer
                hover:border-white/50
                transition
              "
          >
            <input
              id="file"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />

            {files.length > 0 ? (
              <span className="font-medium">
                {files.length} arquivo(s) selecionado(s)
              </span>
            ) : (
              <span className="text-sm opacity-80">
                Clique para escolher arquivos
              </span>
            )}
          </label>
        </div>

        {/* Botão */}
        <Button
          onClick={handleUpload}
          disabled={!files.length || !spotId || loading}
          variant="send"
        >
          {loading ? "Enviando..." : "Enviar Fotos"}
        </Button>
      </Card>
    </main>
  );
}
