import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { StandingsService } from 'src/standings/standings.service';

@Module({
  providers: [TeamService, JwtService, PrismaService, StandingsService],
  controllers: [TeamController],
})
export class TeamModule {}
