import { Router } from "express";
import { ProgressController } from "../controllers/progress.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/update", authMiddleware, ProgressController.update);
router.get("/me", authMiddleware, ProgressController.me);
router.get("/leaderboard", authMiddleware, ProgressController.leaderboard);

export default router;
