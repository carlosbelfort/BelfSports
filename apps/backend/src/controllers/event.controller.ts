import type { Request, Response } from "express"
import {prisma} from "../lib/prisma"

class EventController {
  async list(req: Request, res: Response) {
    const events = await prisma.event.findMany()
    return res.json(events)
  }

  async create(req: Request, res: Response) {
    const { title, description, date } = req.body

    const event = await prisma.event.create({
      data: { title, description, date: new Date(date) },
    })

    return res.status(201).json(event)
  }
}

export default new EventController()

/**
 * PHOTOGRAPHER cria evento
 */
export async function createEvent(req: Request, res: Response) {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({
      message: "Título e data são obrigatórios",
    });
  }

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
 * PHOTOGRAPHER lista os próprios eventos
 */
export async function listMyEvents(req: Request, res: Response) {
  const events = await prisma.event.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(events);
}