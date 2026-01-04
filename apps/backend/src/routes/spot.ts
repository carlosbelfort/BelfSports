/*import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import  roleMiddleware  from "../middlewares/role.middleware";
import { upload } from "../config/multer";
import { createSpot, listApprovedSpots } from "../controllers/spotController";

const router = Router();

router.post("/", authMiddleware, createSpot);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("PHOTOGRAPHER"),
  upload.single("image"),
  createSpot
);
router.get("/approved", listApprovedSpots);

export default router;*/

import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { validateEventOwnership } from '../utils/ownership'
import { Role } from '@prisma/client'

export async function createSpotHandler(request: any, reply: any) {
  const bodySchema = z.object({
    eventId: z.string().uuid(),
    imageUrl: z.string().url(),
  })

  const { eventId, imageUrl } = bodySchema.parse(request.body)

  const user = request.user

  // 1️⃣ Role check
  if (![Role.ADMIN, Role.ORGANIZER].includes(user.role)) {
    return reply.status(403).send({ message: 'Acesso negado.' })
  }

  // 2️⃣ Buscar evento
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  })

  if (!event) {
    return reply.status(404).send({ message: 'Evento não encontrado.' })
  }

  // 3️⃣ Validar ownership (organizer)
  validateEventOwnership({
    user,
    event,
    requireApproved: user.role === Role.ORGANIZER,
  })

  // 4️⃣ Criar spot
  const spot = await prisma.spot.create({
    data: {
      eventId: event.id,
      userId: user.id,
      imageUrl,
    },
  })

  return reply.status(201).send(spot)
}