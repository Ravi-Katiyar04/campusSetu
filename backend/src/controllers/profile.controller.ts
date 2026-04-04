import { Response } from "express";
import { prisma } from "../prisma/client";
import { AuthRequest } from "../middlewares/auth.middleware";

export class ProfileController {


  // UPDATE profile (including skills)
  static async updateProfile(req: AuthRequest, res: Response) {
    const userId = req.user.id;
    const { college, year, skills, course } = req.body;

    const updated = await prisma.profile.update({
      where: { userId },
      data: {
        college,
        course,
        year,
        skills,
      },
    });

    res.json(updated);
  }
}