import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { SchoolService } from './school/school.service';
import { SchoolModule } from './school/school.module';

import { LeagueModule } from './league/league.module';
import { SportModule } from './sport/sport.module';
import { GameModule } from './game/game.module';
import { TeamModule } from './team/team.module';
import { FixtureModule } from './fixture/fixture.module';
import { StandingsModule } from './standings/standings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    SchoolModule,
    LeagueModule,
    SportModule,
    GameModule,
    TeamModule,
    FixtureModule,
    StandingsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SchoolService],
})
export class AppModule {}
