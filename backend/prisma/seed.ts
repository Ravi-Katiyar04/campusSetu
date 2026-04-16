import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("DATABASE_URL:", connectionString);

  await prisma.level.createMany({
    data: [
      { name: "Info", order: 1, description: "Career guidance" },
      { name: "Basic Programming", order: 2, description: "Basics" },
      { name: "Advanced Programming", order: 3, description: "Advanced" },
      { name: "DSA", order: 4, description: "DSA Prep" },
      { name: "Development", order: 5, description: "Dev Tracks" },
      { name: "Project", order: 6, description: "Projects" },
      { name: "Resume", order: 7, description: "Resume Building" },
      { name: "Application", order: 8, description: "Jobs/Internships" },
      { name: "Interview", order: 9, description: "Interview Prep" }
    ],
    skipDuplicates: true
  });

  console.log("✅ Levels seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });