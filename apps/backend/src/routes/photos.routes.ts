import type { FastifyInstance } from "fastify";
import { upload } from "../config/multer";
import { uploadPhoto } from "../controllers/photos.upload.controller";
import { verifyRole } from "../middlewares/verify-role";
import { Role } from "@prisma/client";
import {
  listPendingPhotos,
  approvePhoto,
  rejectPhoto,
} from "../controllers/photos.moderation.controller";

export async function photosRoutes(app: FastifyInstance) {
  app.get("/pending", listPendingPhotos);
  app.patch("/:id/approve", approvePhoto);
  app.delete("/:id/reject", rejectPhoto);
}

export async function uploadRoutes(app: FastifyInstance) {
  app.post(
    "/spots/:spotId/photo",
    {
      preHandler: [
        app.authenticate,
        verifyRole([Role.ADMIN, Role.PHOTOGRAPHER]),
        upload.single("file"),
      ],
    },
    uploadPhoto
  );
}