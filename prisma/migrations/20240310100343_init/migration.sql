/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `Standings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `Standings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Standings" ADD COLUMN     "teamId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Standings_teamId_key" ON "Standings"("teamId");

-- AddForeignKey
ALTER TABLE "Standings" ADD CONSTRAINT "Standings_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
