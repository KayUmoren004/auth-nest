import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from 'src/prisma.service';
import { TeamService } from 'src/team/team.service';
import { GameService } from 'src/game/game.service';
import { JwtService } from '@nestjs/jwt';
import { StandingsService } from 'src/standings/standings.service';
import { FixtureService } from 'src/fixture/fixture.service';

@Module({
  providers: [
    PlayerService,
    PrismaService,
    TeamService,
    GameService,
    JwtService,
    StandingsService,
    FixtureService,
  ],
  controllers: [PlayerController],
})
export class PlayerModule {}
