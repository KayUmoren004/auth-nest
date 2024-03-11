/*
  Warnings:

  - A unique constraint covering the columns `[leagueId]` on the table `Standings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Standings_leagueId_key" ON "Standings"("leagueId");
