import { prisma } from "../lib/prisma";

export async function uploadPhoto(request: any, reply: any) {
  const { id: spotId } = request.params;
  const file = request.file;

  if (!file) {
    return reply.status(400).send({ message: "Imagem obrigatória" });
  }

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
    include: { event: true },
  });

  if (!spot) {
    return reply.status(404).send({ message: "Spot não encontrado" });
  }

  if (spot.event.status !== "APPROVED") {
    return reply
      .status(400)
      .send({ message: "Evento não aprovado" });
  }

  const photo = await prisma.photo.create({
    data: {
      filename: file.filename,
      spotId: spot.id,
    },
  });

  return reply.status(201).send(photo);
}