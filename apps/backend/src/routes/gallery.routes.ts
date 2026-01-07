import type { FastifyInstance } from "fastify";
import { listPublicGallery } from "../controllers/photos.public.controller";

export async function galleryRoutes(app: FastifyInstance) {
  app.get("/", listPublicGallery);
}