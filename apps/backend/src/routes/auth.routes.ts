import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.status(401).send({ message: "Credenciais inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return reply.status(401).send({ message: "Credenciais inválidas" });
    }

    const token = app.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  });

  app.get(
    "/me",
    { preHandler: [app.authenticate] },
    async (request) => {
      const { sub } = request.user as { sub: string };

      const user = await prisma.user.findUnique({
        where: { id: sub },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
    },
      });

      return user;
    }
  );
}