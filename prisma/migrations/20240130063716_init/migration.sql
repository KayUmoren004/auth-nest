/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `LeagueSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LeagueSettings_name_key" ON "LeagueSettings"("name");
