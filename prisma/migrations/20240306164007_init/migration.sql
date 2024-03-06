/*
  Warnings:

  - You are about to drop the column `contactId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `School` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schoolId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_contactId_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "contactId",
DROP COLUMN "domainId";

-- CreateIndex
CREATE UNIQUE INDEX "Contact_schoolId_key" ON "Contact"("schoolId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
