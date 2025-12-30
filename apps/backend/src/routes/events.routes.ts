import type { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import { roleGuard } from "../middlewares/roleGuard";
import { createEvent, listMyEvents } from "../controllers/event.controller";
import { prisma } from "../lib/prisma";
import { approveEvent } from "../controllers/event.controller";

export async function eventRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const events = await prisma.event.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: { date: "asc" },
    });

    return events;
  });

  // LISTAR MEUS EVENTOS ( ORGANIZER)
  app.get(
    "/me",
    {
      preHandler: [authenticate, roleGuard(["ADMIN", "ORGANIZER"])],
    },
    listMyEvents
  );

  // LISTAR TODOS OS EVENTOS ( ADMIN)
  app.get(
    "/admin/events",
    {
      preHandler: [authenticate, roleGuard(["ADMIN"])],
    },
    async () => {
      const events = await prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return events;
    }
  );

  // CRIAR EVENTO (ADMIN / ORGANIZER)
  app.post(
    "/",
    {
      preHandler: [authenticate, roleGuard(["ADMIN", "ORGANIZER"])],
    },
    createEvent
  );

  //ADMIN APROVA EVENTO
  /*app.patch(
    "/events/admin/events/:id/approve",
    {
      preHandler: [authenticate, roleGuard(["ADMIN"])],
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const event = await prisma.event.update({
        where: { id },
        data: {
          status: "APPROVED",
        },
      });

      return reply.send(event);
    }
  );*/

  // ADMIN APROVA EVENTO
  app.patch(
    "/admin/events/:id/approve",
    {
      preHandler: [authenticate, roleGuard(["ADMIN"])],
    },
    approveEvent
  );
}
