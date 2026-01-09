import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function createEvent(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { title, location, date } = request.body as any;
  const user = request.user;

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
  const user = request.user;

  const events = await prisma.event.findMany({
    where: {
      userId: user.sub,
      status: "APPROVED",
    },
    orderBy: { date: "asc" },
  });  

  return reply.send(events);
}

//LISTA TODOS OS EVENTOS APROVADOS//
export async function listAllApprovedEvents(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const events = await prisma.event.findMany({
    where: { status: "APPROVED" },
    orderBy: { date: "asc" },
  });

  return reply.send(events);
}