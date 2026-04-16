import express from "express";
import {prisma} from "../prisma/client";

const router = express.Router();

// Get modules of a level
router.get("/:levelId", async (req, res) => {
  const { levelId } = req.params;

  const modules = await prisma.module.findMany({
    where: { levelId },
    include: { tasks: true },
  });

  res.json(modules);
});

export default router;