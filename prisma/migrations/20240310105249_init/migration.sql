/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `SoccerTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `SoccerTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoccerTable" ADD COLUMN     "teamId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SoccerTable_teamId_key" ON "SoccerTable"("teamId");

-- AddForeignKey
ALTER TABLE "SoccerTable" ADD CONSTRAINT "SoccerTable_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
