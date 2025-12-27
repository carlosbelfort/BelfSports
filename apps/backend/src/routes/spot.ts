import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import  roleMiddleware  from "../middlewares/role.middleware";
import { upload } from "../config/multer";
import { createSpot, listApprovedSpots } from "../controllers/spotController";

const router = Router();

router.post("/", authMiddleware, createSpot);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("PHOTOGRAPHER"),
  upload.single("image"),
  createSpot
);
router.get("/approved", listApprovedSpots);

export default router;
