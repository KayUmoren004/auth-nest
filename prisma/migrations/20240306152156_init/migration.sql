-- DropForeignKey
ALTER TABLE "Fixtures" DROP CONSTRAINT "Fixtures_resultsId_fkey";

-- AlterTable
ALTER TABLE "Fixtures" ALTER COLUMN "resultsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_resultsId_fkey" FOREIGN KEY ("resultsId") REFERENCES "Results"("id") ON DELETE SET NULL ON UPDATE CASCADE;
