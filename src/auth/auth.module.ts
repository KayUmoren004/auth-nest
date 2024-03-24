import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SchoolService } from 'src/school/school.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    JwtService,
    SchoolService,
    SupabaseService,
  ],
})
export class AuthModule {}
