import { Router } from "express";
import  ensureAuth  from "../middlewares/auth.middleware";
import { listMySpots } from "../controllers/photographerSpotsController";

const photographerSpotsRoutes = Router();

photographerSpotsRoutes.use(ensureAuth);

photographerSpotsRoutes.get("/spots", listMySpots);

export { photographerSpotsRoutes };

routes.use("/photographer", photographerSpotsRoutes);