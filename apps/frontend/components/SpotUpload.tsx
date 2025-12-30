"use client";
import SpotForm from "./SpotForm";

interface Props {
  eventId?: string;
  onUpload?: () => void;
}

export default function SpotUpload({ eventId, onUpload }: Props) {
  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">Enviar Foto</h2>
      <SpotForm eventId={eventId} onSuccess={onUpload} />
    </div>
  );
}