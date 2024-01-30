/*
  Warnings:

  - The primary key for the `GameSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GameSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LeagueSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LeagueSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SportSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SportSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TeamSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TeamSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GameSettings" DROP CONSTRAINT "GameSettings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GameSettings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LeagueSettings" DROP CONSTRAINT "LeagueSettings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LeagueSettings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SportSettings" DROP CONSTRAINT "SportSettings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SportSettings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TeamSettings" DROP CONSTRAINT "TeamSettings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TeamSettings_pkey" PRIMARY KEY ("id");
