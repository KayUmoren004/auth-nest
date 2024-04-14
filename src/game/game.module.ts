import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TeamService } from 'src/team/team.service';
import { StandingsService } from 'src/standings/standings.service';
import { PlayerService } from 'src/player/player.service';

@Module({
  providers: [
    GameService,
    PrismaService,
    JwtService,
    TeamService,
    StandingsService,
    PlayerService,
  ],
  controllers: [GameController],
})
export class GameModule {}
