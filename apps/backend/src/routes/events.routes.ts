import type { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import { roleGuard } from "../middlewares/roleGuard";
import {
  createEvent,
  listMyEvents,
} from "../controllers/event.controller";
import { prisma } from "../lib/prisma";

export async function eventRoutes(app: FastifyInstance) {

  // 📌 LISTAR EVENTOS (PÚBLICO)
  app.get("/", async () => {
    return prisma.event.findMany({
      orderBy: { date: "asc" },
    });
  });

  // 📌 LISTAR MEUS EVENTOS (ADMIN / ORGANIZER)
  app.get(
    "/me",
    {
      preHandler: [authenticate, roleGuard(["ADMIN", "ORGANIZER"])],
    },
    listMyEvents
  );

  // 📌 CRIAR EVENTO (ADMIN / ORGANIZER)
  app.post(
    "/",
    {
      preHandler: [authenticate, roleGuard(["ADMIN", "ORGANIZER"])],
    },
    createEvent
  );
}