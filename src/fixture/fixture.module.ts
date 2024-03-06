import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [FixtureService, PrismaService, JwtService],
  controllers: [FixtureController],
})
export class FixtureModule {}
