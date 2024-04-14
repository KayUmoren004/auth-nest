/*
  Warnings:

  - You are about to drop the column `gameAttendanceId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_gameAttendanceId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameAttendanceId";

-- CreateTable
CREATE TABLE "_GameToGameAttendance" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGameAttendance_AB_unique" ON "_GameToGameAttendance"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGameAttendance_B_index" ON "_GameToGameAttendance"("B");

-- AddForeignKey
ALTER TABLE "_GameToGameAttendance" ADD CONSTRAINT "_GameToGameAttendance_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGameAttendance" ADD CONSTRAINT "_GameToGameAttendance_B_fkey" FOREIGN KEY ("B") REFERENCES "GameAttendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
