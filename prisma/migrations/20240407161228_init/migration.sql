-- DropForeignKey
ALTER TABLE "GameAttendance" DROP CONSTRAINT "GameAttendance_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameAttendanceId" TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameAttendanceId_fkey" FOREIGN KEY ("gameAttendanceId") REFERENCES "GameAttendance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
