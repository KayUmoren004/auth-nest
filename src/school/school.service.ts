import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  // Get all schools
  async getAll() {
    return await this.prisma.school.findMany({
      include: {
        users: true,
        domain: true,
        contact: true,
      },
    });
  }
}
