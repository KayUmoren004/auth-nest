/*
  Warnings:

  - You are about to drop the column `awayId` on the `Fixtures` table. All the data in the column will be lost.
  - You are about to drop the column `homeId` on the `Fixtures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[homeFixtureId]` on the table `Fixtures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[awayFixtureId]` on the table `Fixtures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `awayFixtureId` to the `Fixtures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeFixtureId` to the `Fixtures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fixtures" DROP CONSTRAINT "Fixtures_awayId_fkey";

-- DropForeignKey
ALTER TABLE "Fixtures" DROP CONSTRAINT "Fixtures_homeId_fkey";

-- DropIndex
DROP INDEX "Fixtures_awayId_key";

-- DropIndex
DROP INDEX "Fixtures_homeId_key";

-- AlterTable
ALTER TABLE "Fixtures" DROP COLUMN "awayId",
DROP COLUMN "homeId",
ADD COLUMN     "awayFixtureId" TEXT NOT NULL,
ADD COLUMN     "homeFixtureId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fixtures_homeFixtureId_key" ON "Fixtures"("homeFixtureId");

-- CreateIndex
CREATE UNIQUE INDEX "Fixtures_awayFixtureId_key" ON "Fixtures"("awayFixtureId");

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_homeFixtureId_fkey" FOREIGN KEY ("homeFixtureId") REFERENCES "HomeTeamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_awayFixtureId_fkey" FOREIGN KEY ("awayFixtureId") REFERENCES "AwayTeamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
