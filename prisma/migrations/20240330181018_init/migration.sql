/*
  Warnings:

  - You are about to drop the `Roster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerToRoster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlayerToRoster" DROP CONSTRAINT "_PlayerToRoster_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToRoster" DROP CONSTRAINT "_PlayerToRoster_B_fkey";

-- DropTable
DROP TABLE "Roster";

-- DropTable
DROP TABLE "_PlayerToRoster";

-- CreateTable
CREATE TABLE "_GameToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPlayer_AB_unique" ON "_GameToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToPlayer_B_index" ON "_GameToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_GameToPlayer" ADD CONSTRAINT "_GameToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToPlayer" ADD CONSTRAINT "_GameToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
