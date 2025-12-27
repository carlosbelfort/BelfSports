import type { FastifyInstance } from 'fastify'
import { Router } from "express";
import { adminRoutes } from "./admin.routes";
import { spotsRoutes } from "./spots.routes";
import { photographerRoutes } from "./photographer.routes";
import { eventsRoutes } from "./events.routes";

// Função única de registro de rotas
export default async function routes(app: FastifyInstance) {
  // Health check
  app.get('/health', async () => {
    return { status: 'ok' }
  })

  // Rota raiz
  app.get('/', async () => {
    return {
      name: 'BelfSports API',
      status: 'running',
    }
  })

  
}

const routes = Router();

routes.use("/admin", adminRoutes);
routes.use("/spots", spotsRoutes);
routes.use("/photographer", photographerRoutes);
routes.use("/events", eventsRoutes);


export { routes };
