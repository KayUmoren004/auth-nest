/*
  Warnings:

  - Added the required column `teamId` to the `GameAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameAttendance" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GameAttendance" ADD CONSTRAINT "GameAttendance_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
