import { Spot } from "@/types/spot";
import { Button } from "./Button";

interface SpotCardProps {
  spot: Spot;
  role: "ADMIN" | "ORGANIZER" | "PHOTOGRAPHER" | "USER";

  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function SpotCard({
  spot,
  role,
  onApprove,
  onReject,
  onDelete,
}: SpotCardProps) {
  return (
    <div className="border rounded p-4 bg-zinc-900">
      <h3 className="text-lg font-semibold">{spot.name}</h3>

      {spot.description && (
        <p className="text-sm text-zinc-400">{spot.description}</p>
      )}

      <p className="text-sm mt-2">
        <strong>Evento:</strong> {spot.event.title}
      </p>

      <p className="text-xs text-zinc-400 mb-3">
        Status: {spot.status}
      </p>

      {/* ADMIN */}
      {role === "ADMIN" && (
        <div className="flex gap-2">
          {spot.status === "PENDING" && (
            <>
              <Button
                onClick={() => onApprove?.(spot.id)}
                variant="success"
              >
                Aprovar
              </Button>

              <Button
                onClick={() => onReject?.(spot.id)}
                variant="caution"
              >
                Rejeitar
              </Button>
            </>
          )}

          <Button
            onClick={() => onDelete?.(spot.id)}
            variant="danger"
          >
            Excluir
          </Button>
        </div>
      )}

      {/* PHOTOGRAPHER */}
      {role === "PHOTOGRAPHER" && spot.status === "APPROVED" && (
        <a href="../upload">
        <Button variant="sky">
          Enviar Fotos
        </Button>
        </a>
      )}
    </div>
  );
}