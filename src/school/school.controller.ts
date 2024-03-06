import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateSchoolDto } from './dto/school.dto';
import { CreateSchoolResponse } from './dto/school.response';

@ApiTags('School')
@Controller('school')
export class SchoolController {
  // Constructor
  constructor(private schoolService: SchoolService) {}

  // Get All Schools Endpoint - GET /schools
  @Get('list')
  async getAllSchools() {
    return await this.schoolService.getAll();
  }

  // Get Users in a School Endpoint - GET /schools/:id/users
  @UseGuards(JwtGuard)
  @Get(':schoolId/users')
  async getUsersInSchool(@Param('schoolId') schoolId: string) {
    return await this.schoolService.getUsers(schoolId);
  }

  // Create School Endpoint - POST /create
  // @UseGuards(JwtGuard)
  @Post('create')
  @ApiCreatedResponse({
    type: CreateSchoolResponse,
  })
  async createSchool(@Body() dto: CreateSchoolDto) {
    console.log(dto);

    return await this.schoolService.createSchool(dto);
  }
}
