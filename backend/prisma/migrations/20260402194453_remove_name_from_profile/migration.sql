/*
  Warnings:

  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "name",
ALTER COLUMN "college" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL;
