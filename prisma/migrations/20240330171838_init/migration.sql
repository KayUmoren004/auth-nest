-- CreateTable
CREATE TABLE "Roster" (
    "id" TEXT NOT NULL,
    "player" BOOLEAN NOT NULL,

    CONSTRAINT "Roster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToRoster" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToRoster_AB_unique" ON "_PlayerToRoster"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToRoster_B_index" ON "_PlayerToRoster"("B");

-- AddForeignKey
ALTER TABLE "_PlayerToRoster" ADD CONSTRAINT "_PlayerToRoster_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToRoster" ADD CONSTRAINT "_PlayerToRoster_B_fkey" FOREIGN KEY ("B") REFERENCES "Roster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
