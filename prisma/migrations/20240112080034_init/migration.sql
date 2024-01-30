/*
  Warnings:

  - Added the required column `required` to the `GameSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required` to the `LeagueSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required` to the `TeamSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSettings" ADD COLUMN     "required" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "LeagueSettings" ADD COLUMN     "required" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TeamSettings" ADD COLUMN     "required" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "SportSettings" (
    "id" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,

    CONSTRAINT "SportSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SportSettings" ADD CONSTRAINT "SportSettings_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
