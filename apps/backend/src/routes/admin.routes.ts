import type { FastifyInstance } from "fastify";
import ensureAuth from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import {
  listEvents,
  deleteEvent,
} from "../controllers/adminEventsController";

export async function adminRoutes(app: FastifyInstance) {
  // autenticação global
  app.addHook("preHandler", ensureAuth);

  // somente ADMIN
  app.addHook("preHandler", roleMiddleware(["ADMIN"]));

  // listar todos os eventos
  app.get("/events", listEvents);

  // deletar evento
  app.delete("/events/:id", deleteEvent);
}