import type { FastifyInstance } from "fastify";
import { login } from "../controllers/auth.controller";
import { register } from "../controllers/auth.register.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", login);
  app.post("/register", register);
}
