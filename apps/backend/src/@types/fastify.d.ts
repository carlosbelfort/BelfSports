import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      sub: string;
      role: "ADMIN" | "ORGANIZER" | "PHOTOGRAPHER" | "USER";
    };
  }

  interface FastifyInstance {
    authenticate: any;
  }
}
