import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multer from "fastify-multer";
import fastifyStatic from "@fastify/static";
import path from "path";

// Rotas
import { authRoutes } from "./routes/auth.routes";
import { eventRoutes } from "./routes/events.routes";
import { adminRoutes } from "./routes/admin.routes";
import { spotsRoutes } from "./routes/spots.routes";
import { photosRoutes } from "./routes/photos.routes";

// Middleware
import { authenticate } from "./middlewares/authenticate";

export const app = Fastify({
  logger: true,
});

// =====================
// Plugins
// =====================

// CORS
await app.register(cors, {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// JWT
await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? "supersecret",
});


// REGISTRA O MULTER
app.register(multer.contentParser);

// =====================
// Decorators
// =====================

app.decorate("authenticate", authenticate);

// =====================
// Rotas públicas
// =====================

app.register(authRoutes, { prefix: "/auth" });

// =====================
// Rotas protegidas
// =====================

app.register(async (protectedRoutes) => {
  protectedRoutes.addHook("onRequest", protectedRoutes.authenticate);

  protectedRoutes.register(eventRoutes, { prefix: "/events" });
  protectedRoutes.register(spotsRoutes, { prefix: "/spots" });
  protectedRoutes.register(photosRoutes, { prefix: "/photos" });
  protectedRoutes.register(adminRoutes, { prefix: "/admin" });
});

// SERVE UPLOADS
app.register(fastifyStatic, {
  root: path.resolve("uploads"),
  prefix: "/uploads/",
});

// =====================
// Start server
// =====================

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => {
    console.log("🚀 Backend rodando em http://localhost:3333");
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
