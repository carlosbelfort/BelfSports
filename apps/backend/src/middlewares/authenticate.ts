/*import type { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({
      message: "Não autorizado",
    });
  }
}*/

import type { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const decoded = await request.jwtVerify<{
      sub: string;
      role: string;
      email?: string;
    }>();

    
    request.user = {
      sub: decoded.sub,
      role: decoded.role,
      email: decoded.email,
    };
  } catch (err) {
    return reply.status(401).send({
      message: "Não autorizado",
    });
  }
}