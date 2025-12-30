import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function createEvent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { title, location, date } = request.body as {
    title: string;
    location: string;
    date: string;
  };

  const user = request.user as { sub: string };

  if (!title || !date || !location) {
    return reply.status(400).send({
      message: "Título, data e local são obrigatórios",
    });
  }

  const event = await prisma.event.create({
    data: {
      title,
      location,
      date: new Date(date),
      userId: user.sub,
    },
  });

  return reply.status(201).send(event);
}

export async function listMyEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user as { sub: string };

  const events = await prisma.event.findMany({
    where: {
      userId: user.sub,
      status: "APPROVED",
    },
    orderBy: {
      date: "asc",
    },
  });

  return reply.send(events);
}