import type { FastifyInstance } from "fastify";
import { verifyRole } from "../middlewares/verify-role";
import { Role } from "@prisma/client";
import {
  createEvent,
  listMyEvents,
  listAllApprovedEvents,
} from "../controllers/event.controller";

export async function eventRoutes(app: FastifyInstance) {
  app.post("/", createEvent);

  app.get(
    "/me",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ORGANIZER]),
      ],
    },
    listMyEvents
  );

  // 🔹 ADMIN
  app.get(
    "/",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ADMIN]),
      ],
    },
    listAllApprovedEvents
  );
}
