import type { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import roleMiddleware from "../middlewares/role.middleware";
import { upload } from "../config/multer";
import { uploadPhoto } from "../controllers/photo.controller";
import { listSpots } from "../controllers/spot.list.controller";
import {
  createSpot,
  updateSpotStatus,
  deleteSpot,  
} from "../controllers/spotController";

export async function spotsRoutes(app: FastifyInstance) {
  // Autenticação obrigatória para todas as rotas
  app.addHook("preHandler", authenticate);

  // LISTAGEM DE SPOTS (ADMIN / ORGANIZER / PHOTOGRAPHER)
  app.get("/spots", listSpots);
  

  //Realiza Upload em spots de eventos aprovados
  app.post(
    "/spots/:id/photos",
    {
      preHandler: [
        roleMiddleware(["ADMIN", "PHOTOGRAPHER"]),
        upload.single("image"),
      ],
    },
    uploadPhoto
  );

  // CRIAR SPOT (ADMIN // ORGANIZER)
  app.post(
    "/spots",
    { preHandler: roleMiddleware(["ADMIN", "ORGANIZER"]) },
    createSpot
  );

  // ATUALIZAR STATUS (apenas Admin)
  app.patch(
    "/spots/:id/status",
    { preHandler: roleMiddleware(["ADMIN"]) },
    updateSpotStatus
  );

  // DELETE (apenas Admin ou Organizer dono do spot)
  app.delete("/spots/:id", deleteSpot);
}
