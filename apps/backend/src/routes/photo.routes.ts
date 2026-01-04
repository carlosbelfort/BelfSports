import type { FastifyInstance } from "fastify";
import { approvePhoto, rejectPhoto, listPendingPhotos } from "../controllers/photoModerationController";
import roleMiddleware from "../middlewares/role.middleware";

export async function photoRoutes(app: FastifyInstance) {
  app.get("/photos/pending", listPendingPhotos);
  app.patch("/photos/:id/approve", { preHandler: roleMiddleware(["ADMIN", "ORGANIZER"]) }, approvePhoto);
  app.delete("/photos/:id", { preHandler: roleMiddleware(["ADMIN", "ORGANIZER"]) }, rejectPhoto);
}