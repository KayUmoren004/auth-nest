/*
  Warnings:

  - You are about to drop the column `gameId` on the `Results` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameId]` on the table `Fixtures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Fixtures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_gameId_fkey";

-- DropIndex
DROP INDEX "Results_gameId_key";

-- AlterTable
ALTER TABLE "Fixtures" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "gameId";

-- CreateIndex
CREATE UNIQUE INDEX "Fixtures_gameId_key" ON "Fixtures"("gameId");

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
