import { Module } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LeagueService } from 'src/league/league.service';

@Module({
  providers: [StandingsService, PrismaService, JwtService],
  controllers: [StandingsController],
})
export class StandingsModule {}
