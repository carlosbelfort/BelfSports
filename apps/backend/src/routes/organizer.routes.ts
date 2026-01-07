import type { FastifyInstance } from "fastify";
import { listOrganizerEvents } from "../controllers/events.organizer.controller";
import { verifyRole } from "../middlewares/verify-role";
import { Role } from "@prisma/client";

export async function organizerRoutes(app: FastifyInstance) {
  app.get(
    "/events",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ORGANIZER]),
      ],
    },
    listOrganizerEvents
  );
}