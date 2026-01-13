import type { FastifyInstance } from "fastify";
import { uploadPhoto } from "../controllers/photos.upload.controller";
import { verifyRole } from "../middlewares/verify-role";
import { Role } from "@prisma/client";
import {
  listPendingPhotos,
  approvePhoto,
  rejectPhoto,
} from "../controllers/photos.moderation.controller";

export async function photosRoutes(app: FastifyInstance) {
  // Moderação (ADMIN / ORGANIZER)
  app.get(
    "/pending",
    {
      preHandler: [app.authenticate, verifyRole([Role.ADMIN, Role.ORGANIZER])],
    },
    listPendingPhotos
  );

  app.patch(
    "/:id/approve",
    {
      preHandler: [app.authenticate, verifyRole([Role.ADMIN, Role.ORGANIZER])],
    },
    approvePhoto
  );

  app.delete(
    "/:id/reject",
    {
      preHandler: [app.authenticate, verifyRole([Role.ADMIN, Role.ORGANIZER])],
    },
    rejectPhoto
  );

  // Upload (ADMIN / PHOTOGRAPHER)
  app.post(
    "/spots/:spotId/photo",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ADMIN, Role.PHOTOGRAPHER]),
      ],
    },
    uploadPhoto
  );
}
