import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { pipeline } from "stream/promises";
import path from "path";
import fs from "fs";


export async function uploadPhoto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { spotId } = request.params as { spotId: string };
  const user = request.user;

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

  const files = request.files();
  const savedPhotos = [];

  for await (const file of files) {
    const filename = `${Date.now()}-${file.filename}`;
    const filePath = path.join(process.cwd(), "uploads", filename);

    await pipeline(file.file, fs.createWriteStream(filePath));

    const photo = await prisma.photo.create({
      data: {
        filename,
        spotId,
        approved: user.role === "ADMIN",
      },
    });

    savedPhotos.push(photo);
  }

  if (savedPhotos.length === 0) {
    return reply.status(400).send({ message: "Nenhum arquivo enviado" });
  }

  return reply.status(201).send({
    message: "Fotos enviadas com sucesso",
    total: savedPhotos.length,
  });
}
