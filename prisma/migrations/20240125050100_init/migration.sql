/*
  Warnings:

  - Changed the type of `value` on the `LeagueSettings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LeagueSettings" DROP COLUMN "value",
ADD COLUMN     "value" JSONB NOT NULL;
