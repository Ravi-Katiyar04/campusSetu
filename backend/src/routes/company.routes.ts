import { Router } from "express";
import { CompanyController } from "../controllers/company.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/adminOnly.middleware";

const router = Router();

// STUDENT — view
router.get("/", authMiddleware, CompanyController.list);

// ADMIN — manage
router.post("/", authMiddleware, adminOnly, CompanyController.create);
router.put("/:id", authMiddleware, adminOnly, CompanyController.update);
router.delete("/:id", authMiddleware, adminOnly, CompanyController.remove);

export default router;
