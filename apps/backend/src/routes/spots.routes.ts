import { Router } from "express";
import  ensureAuth  from "../middlewares/auth.middleware";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import {
  createSpot,
  listSpots,
  updateSpotStatus,
  deleteSpot,
} from "../controllers/spotController";

const spotsRoutes = Router();

spotsRoutes.use(ensureAuth);

// PHOTOGRAPHER
spotsRoutes.post("/", createSpot);

// ADMIN / ORGANIZER
spotsRoutes.get("/", listSpots);

// ADMIN
spotsRoutes.patch("/:id/status", ensureAdmin, updateSpotStatus);
spotsRoutes.delete("/:id", ensureAdmin, deleteSpot);

export { spotsRoutes };