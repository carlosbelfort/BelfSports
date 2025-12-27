import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import {
  listPendingSpots,
  approveSpot,
  rejectSpot,
} from "../controllers/adminSpotController";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));

router.get("/spots/pending", listPendingSpots);
router.patch("/spots/:id/approve", approveSpot);
router.patch("/spots/:id/reject", rejectSpot);

export default router;
