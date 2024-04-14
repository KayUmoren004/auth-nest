-- CreateTable
CREATE TABLE "GameAttendance" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL,

    CONSTRAINT "GameAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameAttendance" ADD CONSTRAINT "GameAttendance_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAttendance" ADD CONSTRAINT "GameAttendance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
