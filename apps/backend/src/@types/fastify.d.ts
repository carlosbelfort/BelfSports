import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      sub: string;
      role: string;
      email?: string;
    };
  }

   interface FastifyInstance {
    authenticate: any;
  }
}