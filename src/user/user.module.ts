import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SchoolService } from 'src/school/school.service';

@Module({
  providers: [UserService, PrismaService, JwtService, SchoolService],
  controllers: [UserController],
})
export class UserModule {}
