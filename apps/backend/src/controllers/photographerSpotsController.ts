import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

/**
 * Photographer vê seus spots e status
 */
export async function listMySpots(req: Request, res: Response) {
  const spots = await prisma.spot.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      event: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(spots);
}