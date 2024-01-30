import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
}
