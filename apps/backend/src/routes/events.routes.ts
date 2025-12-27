import { Router } from "express";
import  ensureAuth  from "../middlewares/auth.middleware";
import {
  createEvent,
  listMyEvents,
} from "../controllers/event.controller";

const eventsRoutes = Router();

eventsRoutes.use(ensureAuth);

// PHOTOGRAPHER
eventsRoutes.post("/", createEvent);
eventsRoutes.get("/", listMyEvents);

export { eventsRoutes };