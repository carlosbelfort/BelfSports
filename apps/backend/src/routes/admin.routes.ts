import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import {
  listEvents,
  deleteEvent,
} from "../controllers/adminEventsController";

const adminRoutes = Router();

adminRoutes.use(ensureAuth);
adminRoutes.use(ensureAdmin);

adminRoutes.get("/events", listEvents);
adminRoutes.delete("/events/:id", deleteEvent);

export { adminRoutes };