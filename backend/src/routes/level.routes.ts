import express from "express";
import { prisma } from "../prisma/client";

const router = express.Router();

// GET all levels
router.get("/", async (_, res) => {
  const levels = await prisma.level.findMany({
    orderBy: { order: "asc" },
  });

  res.json(levels);
});

export default router;