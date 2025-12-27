import type { FastifyInstance } from 'fastify'
import { Router } from "express";
import { adminRoutes } from "./admin.routes";

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

export { routes };
