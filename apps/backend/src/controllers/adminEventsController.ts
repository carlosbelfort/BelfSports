import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function listEvents(req: Request, res: Response) {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return res.json(events);
}

export async function deleteEvent(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.event.delete({
    where: { id },
  });

  return res.status(204).send();
}