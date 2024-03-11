/*
  Warnings:

  - A unique constraint covering the columns `[leagueId]` on the table `SoccerTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leagueId` to the `SoccerTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoccerTable" ADD COLUMN     "leagueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SoccerTable_leagueId_key" ON "SoccerTable"("leagueId");

-- AddForeignKey
ALTER TABLE "SoccerTable" ADD CONSTRAINT "SoccerTable_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
