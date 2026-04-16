import express from "express";
import { prisma } from "../prisma/client"; // your adapter-based client

const router = express.Router();

// ✅ COMPLETE MODULE
router.post("/complete", async (req, res) => {
  try {
    const { userId, moduleId } = req.body;

    // 1. Mark module complete
    const moduleProgress = await prisma.moduleProgress.upsert({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
      update: { completed: true },
      create: {
        userId,
        moduleId,
        completed: true,
      },
    });

    // 2. Update XP in Progress table
    await prisma.progress.update({
      where: { userId },
      data: {
        xp: {
          increment: 10,
        },
        lastActiveAt: new Date(),
      },
    });

    res.json({
      message: "Module completed",
      moduleProgress,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;