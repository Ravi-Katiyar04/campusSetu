import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.put("/", authMiddleware, ProfileController.updateProfile);

export default router;