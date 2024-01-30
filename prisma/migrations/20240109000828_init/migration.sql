/*
  Warnings:

  - Changed the type of `division` on the `League` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "League" DROP COLUMN "division",
ADD COLUMN     "division" TEXT NOT NULL;
