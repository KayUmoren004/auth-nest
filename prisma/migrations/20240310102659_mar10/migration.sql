/*
  Warnings:

  - You are about to drop the column `resultsId` on the `Fixtures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fixtureId]` on the table `Results` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gameId]` on the table `Results` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fixtureId` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fixtures" DROP CONSTRAINT "Fixtures_resultsId_fkey";

-- AlterTable
ALTER TABLE "Fixtures" DROP COLUMN "resultsId";

-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "fixtureId" TEXT NOT NULL,
ADD COLUMN     "gameId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Results_fixtureId_key" ON "Results"("fixtureId");

-- CreateIndex
CREATE UNIQUE INDEX "Results_gameId_key" ON "Results"("gameId");

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixtures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
