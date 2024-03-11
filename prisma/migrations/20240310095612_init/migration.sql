/*
  Warnings:

  - You are about to drop the column `teamId` on the `Standings` table. All the data in the column will be lost.
  - Added the required column `leagueId` to the `Standings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Standings" DROP CONSTRAINT "Standings_teamId_fkey";

-- DropIndex
DROP INDEX "Standings_teamId_key";

-- AlterTable
ALTER TABLE "Standings" DROP COLUMN "teamId",
ADD COLUMN     "leagueId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Standings" ADD CONSTRAINT "Standings_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
