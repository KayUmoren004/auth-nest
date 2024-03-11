/*
  Warnings:

  - A unique constraint covering the columns `[leagueId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leagueId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "leagueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_leagueId_key" ON "Game"("leagueId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
