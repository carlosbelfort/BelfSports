import type { FastifyInstance } from "fastify";
import { createSpot } from "../controllers/spots.controller";
import { listSpots } from "../controllers/spots.list.controller";

import { uploadPhoto } from "../controllers/photos.upload.controller";

export async function spotsRoutes(app: FastifyInstance) {
  app.post("/", createSpot);
  app.get("/", listSpots);

  // Upload de foto (fotógrafo / admin)
  app.post("/:spotId/photos", uploadPhoto);
}
