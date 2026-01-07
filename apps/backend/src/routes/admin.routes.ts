import type { FastifyInstance } from "fastify";

// Users
import {
  listUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
} from "../controllers/admin.users.controller";

// Events
import {
  listEvents,
  approveEvent,
  deleteEvent,
} from "../controllers/admin.events.controller";

// Spots
import {
  listPendingSpots,
  updateSpotStatus
} from "../controllers/admin.spots.controller";

export async function adminRoutes(app: FastifyInstance) {
  // Users
  app.get("/users", listUsers);
  app.patch("/users/:id/role", updateUserRole);
  app.patch("/users/:id/status", toggleUserStatus);
  app.delete("/users/:id", deleteUser);

  // Events
  app.get("/events", listEvents);
  app.patch("/events/:id/approve", approveEvent);
  app.delete("/events/:id", deleteEvent);

  // Spots
  app.get("/spots/pending", listPendingSpots);
  app.patch("/spots/:id/approve", updateSpotStatus);
  app.patch("/spots/:id/reject", updateSpotStatus);
}