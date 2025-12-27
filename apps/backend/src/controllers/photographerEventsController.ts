import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

/**
 * Photographer cria evento
 */
export async function createEvent(req: Request, res: Response) {
  const { title, date } = req.body;

  const event = await prisma.event.create({
    data: {
      title,
      date: new Date(date),
      userId: req.user.id,
    },
  });

  return res.status(201).json(event);
}

/**
 * Photographer lista seus eventos
 */
export async function listMyEvents(req: Request, res: Response) {
  const events = await prisma.event.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      spots: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(events);
}