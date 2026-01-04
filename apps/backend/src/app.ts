import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import { authRoutes } from "./routes/auth.routes";
import { eventRoutes } from "./routes/events.routes";
import { spotsRoutes } from "./routes/spots.routes";
import { uploadRoutes } from "./routes/photo.routes";
import { moderationRoutes } from "./routes/moderation.routes";
import { usersRoutes } from "./routes/users.routes";

const app = Fastify({
  logger: true,
});

/*app.register(cors, {
  origin: true,
});*/

await app.register(cors, {
  origin: "http://localhost:3000", // frontend
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(multipart);

// 📌 ROTAS
app.register(authRoutes, { prefix: "/auth" });
app.register(eventRoutes, { prefix: "/events" });
app.register(spotsRoutes, { prefix: "/spots" });
app.register(uploadRoutes, { prefix: "/upload" });
app.register(moderationRoutes, { prefix: "/moderation" });
app.register(usersRoutes, { prefix: "/users" });

// 📂 Uploads públicos (galeria)
app.register(require("@fastify/static"), {
  root: require("path").join(__dirname, "..", "uploads"),
  prefix: "/uploads/",
});

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("🚀 Backend rodando em http://localhost:3333");
});
