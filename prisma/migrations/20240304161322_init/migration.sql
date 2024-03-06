/*
  Warnings:

  - Added the required column `resultsId` to the `Fixtures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixtures" ADD COLUMN     "resultsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
