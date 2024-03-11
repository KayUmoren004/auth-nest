-- CreateTable
CREATE TABLE "Standings" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "sportTypeId" TEXT NOT NULL,
    "sportType" TEXT NOT NULL,

    CONSTRAINT "Standings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoccerTable" (
    "id" TEXT NOT NULL,
    "played" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "loss" INTEGER NOT NULL,
    "goalsFor" INTEGER NOT NULL,
    "goalsAgainst" INTEGER NOT NULL,
    "goalDifference" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "SoccerTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolleyballTable" (
    "id" TEXT NOT NULL,
    "played" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "loss" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "VolleyballTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasketballTable" (
    "id" TEXT NOT NULL,
    "played" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "loss" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "winPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BasketballTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Standings_teamId_key" ON "Standings"("teamId");

-- AddForeignKey
ALTER TABLE "Standings" ADD CONSTRAINT "Standings_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
