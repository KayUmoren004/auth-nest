import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SchoolService, PrismaService, JwtService],
  controllers: [SchoolController],
})
export class SchoolModule {}
