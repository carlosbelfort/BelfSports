import type { FastifyInstance } from "fastify";
import { Role } from "@prisma/client";
import { verifyRole } from "../middlewares/verify-role";
import {
  listPendingPhotos,
  approvePhoto,
  rejectPhoto,
} from "../controllers/photos.moderation.controller";

export async function moderationRoutes(app: FastifyInstance) {
  app.addHook("onRequest", app.authenticate);

  app.get(
    "/photos",
    { preHandler: verifyRole([Role.ADMIN, Role.ORGANIZER]) },
    listPendingPhotos
  );

  app.patch(
    "/photos/:id/approve",
    { preHandler: verifyRole([Role.ADMIN, Role.ORGANIZER]) },
    approvePhoto
  );

  app.delete(
    "/photos/:id/reject",
    { preHandler: verifyRole([Role.ADMIN, Role.ORGANIZER]) },
    rejectPhoto
  );
}