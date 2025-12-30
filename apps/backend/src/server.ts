import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import path from "path";
import fastifyStatic from "@fastify/static";

import { authRoutes } from "./routes/auth.routes";
import { eventRoutes } from "./routes/events.routes";
import { adminRoutes } from "./routes/admin.routes";
import { spotsRoutes } from "./routes/spots.routes";
import { authenticate } from "./middlewares/authenticate";

const app = Fastify({ logger: true });

// CORS
await app.register(cors, {
  origin: "http://localhost:3000", // frontend
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// JWT
app.register(jwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});

// Serve arquivos estáticos (uploads)
app.register(fastifyStatic, {
  root: path.resolve("uploads"),
  prefix: "/uploads/",
});

// Decorate authenticate
app.decorate("authenticate", authenticate);

// Rotas
app.register(authRoutes, { prefix: "/auth" });
app.register(eventRoutes, { prefix: "/events" });
app.register(adminRoutes, { prefix: "/admin" });
app.register(spotsRoutes);

// Start server
app.listen({ port: 3333 }).then(() => {
  console.log("🚀 Backend rodando em http://localhost:3333");
});

export { app };