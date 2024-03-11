import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GameService } from 'src/game/game.service';
import { TeamService } from 'src/team/team.service';
import { StandingsService } from 'src/standings/standings.service';

@Module({
  providers: [
    FixtureService,
    PrismaService,
    JwtService,
    GameService,
    TeamService,
    StandingsService,
  ],
  controllers: [FixtureController],
})
export class FixtureModule {}
