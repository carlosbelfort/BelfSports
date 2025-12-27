import { Router } from "express";
import  ensureAuth  from "../middlewares/auth.middleware";
import {
  createEvent,
  listMyEvents,
} from "../controllers/photographerEventsController";

const photographerRoutes = Router();

photographerRoutes.use(ensureAuth);

photographerRoutes.post("/events", createEvent);
photographerRoutes.get("/events", listMyEvents);

export { photographerRoutes };