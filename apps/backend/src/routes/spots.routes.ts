import type { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import roleMiddleware from "../middlewares/role.middleware";
import { upload } from "../config/multer";
import { uploadPhoto } from "../controllers/photo.controller";
import {
  createSpot,
  listSpots,
  updateSpotStatus,
  deleteSpot,
  listSpotsForOrganizer,
} from "../controllers/spotController";

export async function spotsRoutes(app: FastifyInstance) {
  // Autenticação obrigatória para todas as rotas
  app.addHook("preHandler", authenticate);

  // LISTAR TODOS (Admin)
  app.get("/spots", listSpots);

  // LISTAR DO ORGANIZER
  app.get("/spots/organizer", listSpotsForOrganizer);

  //Realiza Upload em spots de eventos aprovados
  app.post(
    "/spots/:id/photos",
    { preHandler: upload.single("image") },
    uploadPhoto
  );

  // CRIAR SPOT (com upload)
  app.post("/spots", { preHandler: upload.single("image") }, createSpot);

  // ATUALIZAR STATUS (apenas Admin)
  app.patch(
    "/spots/:id/status",
    { preHandler: roleMiddleware(["ADMIN"]) },
    updateSpotStatus
  );

  // DELETE (apenas Admin ou Organizer dono do spot)
  app.delete("/spots/:id", deleteSpot);
}
