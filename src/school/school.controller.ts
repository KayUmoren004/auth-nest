import { Controller, Get } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
  // Constructor
  constructor(private schoolService: SchoolService) {}

  // Get All Schools Endpoint - GET /schools
  @Get('list')
  async getAllSchools() {
    return await this.schoolService.getAll();
  }
}
