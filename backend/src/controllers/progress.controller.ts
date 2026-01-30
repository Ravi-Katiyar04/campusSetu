import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ProgressService } from "../services/progress.service";
import { prisma } from "../prisma/client";

export class ProgressController {
  // POST /progress/update
  static async update(req: AuthRequest, res: Response) {
    const { xp } = req.body;

    if (!xp || xp <= 0) {
      return res.status(400).json({ message: "XP must be positive" });
    }

    const progress = await ProgressService.updateProgress(req.user.id, xp);

    res.json({
      message: "Progress updated",
      level: progress.level,
      xp: progress.xp,
      streak: progress.streak,
    });
  }

  // GET /progress/me
  static async me(req: AuthRequest, res: Response) {
    const progress = await prisma.progress.findUnique({
      where: { userId: req.user.id },
    });

    res.json(progress);
  }

  // GET /leaderboard
  static async leaderboard(req: AuthRequest, res: Response) {
    const leaderboard = await prisma.progress.findMany({
      orderBy: [
        { level: "desc" },
        { xp: "desc" },
        { streak: "desc" },
      ],
      take: 10,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(
      leaderboard.map((p) => ({
        name: p.user.name,
        level: p.level,
        xp: p.xp,
        streak: p.streak,
      }))
    );
  }
}
