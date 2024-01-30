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

  // Find a school by domain
  async findIdByDomain(domain: string) {
    const school = await this.prisma.school.findFirst({
      where: { domain: { domain } },
    });

    return school.id;
  }

  // Get Users in a school
  async getUsers(schoolId: string) {
    const users = await this.prisma.school
      .findUnique({
        where: {
          id: schoolId,
        },
      })
      .users({
        include: {
          profile: true,
        },
      });

    // Delete password from users
    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }
}
