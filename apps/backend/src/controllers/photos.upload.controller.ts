/*import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function uploadPhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { spotId } = request.params as { spotId: string };
  const file = (request as any).file;
  const user = request.user;

  if (!file) {
    return reply.status(400).send({ message: "Arquivo não enviado" });
  }

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
    include: { event: true },
  });

  if (!spot || spot.status !== "APPROVED" || spot.event.status !== "APPROVED") {
    return reply.status(400).send({ message: "Spot ou evento inválido" });
  }

  if (!["ADMIN", "PHOTOGRAPHER"].includes(user.role)) {
    return reply.status(403).send({ message: "Permissão negada" });
  }

  const photo = await prisma.photo.create({
    data: {
      filename: file.filename,
      spotId,
      approved: user.role === "ADMIN", // ADMIN aprova automaticamente
    },
  });

  return reply.status(201).send(photo);
}*/

import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import path from "path";
import fs from "fs";

export async function uploadPhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { spotId } = request.params as { spotId: string };
  const user = request.user;

  const file = await request.file();

  if (!file) {
    return reply.status(400).send({ message: "Arquivo não enviado" });
  }

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
    include: { event: true },
  });

  if (!spot || spot.status !== "APPROVED" || spot.event.status !== "APPROVED") {
    return reply.status(400).send({ message: "Spot ou evento inválido" });
  }

  if (!["ADMIN", "PHOTOGRAPHER"].includes(user.role)) {
    return reply.status(403).send({ message: "Permissão negada" });
  }

  // salvar arquivo
  const filename = `${Date.now()}-${file.filename}`;
  const filePath = path.join(process.cwd(), "uploads", filename);

  await fs.promises.writeFile(filePath, await file.toBuffer());

  const photo = await prisma.photo.create({
    data: {
      filename,
      spotId,
      approved: user.role === "ADMIN",
    },
  });

  return reply.status(201).send(photo);
}