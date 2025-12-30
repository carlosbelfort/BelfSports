import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth.routes";
import { eventRoutes } from "./routes/events.routes";
import { authenticate } from "./middlewares/authenticate";
import { adminRoutes } from "./routes/admin.routes";

const app = Fastify({ logger: true });

app.register(cors, { origin: true });

app.register(jwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});

// 🔐 decorar ANTES das rotas
app.decorate("authenticate", authenticate);

// 📌 rotas
app.register(authRoutes, { prefix: "/auth" });
app.register(eventRoutes, { prefix: "/events" });

app.register(adminRoutes, { prefix: "/admin" });

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 Backend rodando em http://localhost:3333");
});

export { app };