/*
  Warnings:

  - You are about to drop the column `location` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `packageLPA` on the `Company` table. All the data in the column will be lost.
  - Added the required column `packageOffered` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentsPlaced` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "location",
DROP COLUMN "packageLPA",
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "packageOffered" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "questionsAsked" TEXT[],
ADD COLUMN     "studentsPlaced" INTEGER NOT NULL;
