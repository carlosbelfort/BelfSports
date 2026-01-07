import type { FastifyInstance } from "fastify";
import {
  createEvent,
  listMyEvents,
} from "../controllers/event.controller";

export async function eventRoutes(app: FastifyInstance) {
  app.post("/", createEvent);
  app.get("/me", listMyEvents);
}