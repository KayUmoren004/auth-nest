/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Sport` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `season` on the `Sport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sport" DROP COLUMN "season",
ADD COLUMN     "season" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sport_name_key" ON "Sport"("name");
