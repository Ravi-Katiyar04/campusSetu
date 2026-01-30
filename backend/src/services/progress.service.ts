import { prisma } from "../prisma/client";
import { LEVELS } from "../constants/levels";

export class ProgressService {
    static calculateLevel(xp: number): number {
        let level = 1;
        for (const l of LEVELS) {
            if (xp >= l.xpRequired) level = l.level;
        }
        return level;
    }

    static async updateProgress(userId: string, gainedXp: number) {
        const existing = await prisma.progress.findUnique({
            where: { userId },
        });

        const now = new Date();
        let streak = 1;

        if (existing?.lastActiveAt) {
            const diffDays =
                (now.getTime() - existing.lastActiveAt.getTime()) /
                (1000 * 60 * 60 * 24);

            streak = diffDays <= 1.5 ? existing.streak + 1 : 1;
        }

        const newXp = (existing?.xp || 0) + gainedXp;
        const newLevel = this.calculateLevel(newXp);

        return prisma.progress.upsert({
            where: { userId },
            create: {
                userId,
                xp: newXp,
                level: newLevel,
                streak,
                lastActiveAt: now,
            },
            update: {
                xp: newXp,
                level: newLevel,
                streak,
                lastActiveAt: now,
            },
        });
    }
}
