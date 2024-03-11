/*
  Warnings:

  - A unique constraint covering the columns `[sportTypeId]` on the table `Standings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Standings_sportTypeId_key" ON "Standings"("sportTypeId");
