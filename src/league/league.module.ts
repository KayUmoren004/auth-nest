import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { StandingsService } from 'src/standings/standings.service';

@Module({
  providers: [LeagueService, PrismaService, JwtService],
  controllers: [LeagueController],
})
export class LeagueModule {}
