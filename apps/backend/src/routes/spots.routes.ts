import type { FastifyInstance } from "fastify";
import { createSpot } from "../controllers/spots.controller";
import { listSpots } from "../controllers/spots.list.controller";
import { verifyRole } from "../middlewares/verify-role";
import { Role } from "@prisma/client";
import {
  listPendingSpots,
  updateSpotStatus,
} from "../controllers/admin.spots.controller";

export async function spotsRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [app.authenticate, verifyRole([Role.ADMIN, Role.ORGANIZER])],
    },
    createSpot
  );
  app.get("/", listSpots);

  // ADMIN — listar spots pendentes
  app.get(
    "/pending",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ADMIN]),
      ],
    },
    listPendingSpots
  );

  // ADMIN — aprovar / rejeitar spot
  app.patch(
    "/:id/status",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ADMIN]),
      ],
    },
    updateSpotStatus
  );

  // ADMIN — excluir spot
  app.delete(
    "/:id",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ADMIN]),
      ],
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      await app.prisma.spot.delete({
        where: { id },
      });

      return reply.status(204).send();
    }
  );
}
