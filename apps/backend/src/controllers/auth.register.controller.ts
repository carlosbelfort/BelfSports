import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import type { FastifyRequest, FastifyReply } from "fastify";

export async function register(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, email, password } = request.body as {
    name: string;
    email: string;
    password: string;
  };

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return reply.status(400).send({ message: "E-mail já cadastrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role: "USER",
      active: false, 
    },
  });

  return reply.status(201).send({
    message: "Cadastro realizado. Aguarde aprovação do administrador.",
  });
}