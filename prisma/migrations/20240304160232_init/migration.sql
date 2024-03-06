-- CreateTable
CREATE TABLE "HomeTeamType" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "HomeTeamType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwayTeamType" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AwayTeamType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,
    "awayId" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "awayScore" INTEGER NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fixtures" (
    "id" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,
    "awayId" TEXT NOT NULL,

    CONSTRAINT "Fixtures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeTeamType_homeTeamId_key" ON "HomeTeamType"("homeTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "AwayTeamType_awayTeamId_key" ON "AwayTeamType"("awayTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "Fixtures_homeId_key" ON "Fixtures"("homeId");

-- CreateIndex
CREATE UNIQUE INDEX "Fixtures_awayId_key" ON "Fixtures"("awayId");

-- AddForeignKey
ALTER TABLE "HomeTeamType" ADD CONSTRAINT "HomeTeamType_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwayTeamType" ADD CONSTRAINT "AwayTeamType_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeTeamType"("homeTeamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixtures" ADD CONSTRAINT "Fixtures_awayId_fkey" FOREIGN KEY ("awayId") REFERENCES "AwayTeamType"("awayTeamId") ON DELETE RESTRICT ON UPDATE CASCADE;
