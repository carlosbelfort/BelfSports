import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

/**
 * PHOTOGRAPHER envia spot
 */
export async function createSpot(req: Request, res: Response) {
  const { imageUrl, eventId } = req.body;

  const spot = await prisma.spot.create({
    data: {
      imageUrl,
      eventId,
      userId: req.user.id,
    },
  });

  return res.status(201).json(spot);
}

/**
 * ADMIN e ORGANIZER visualizam
 */
export async function listSpots(req: Request, res: Response) {
  const spots = await prisma.spot.findMany({
    include: {
      event: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(spots);
}

/**
 * ADMIN aprova / rejeita
 */
export async function updateSpotStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const spot = await prisma.spot.update({
    where: { id },
    data: { status },
  });

  return res.json(spot);
}

/**
 * ADMIN remove
 */
export async function deleteSpot(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.spot.delete({
    where: { id },
  });

  return res.status(204).send();
}