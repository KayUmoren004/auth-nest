import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { StandingsService } from 'src/standings/standings.service';
import { PlayerService } from 'src/player/player.service';

@Module({
  providers: [
    TeamService,
    JwtService,
    PrismaService,
    StandingsService,
    PlayerService,
  ],
  controllers: [TeamController],
})
export class TeamModule {}
