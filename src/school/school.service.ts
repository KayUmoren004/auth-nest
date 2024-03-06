import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  // Create a new school
  async createSchool(dto: CreateSchoolDto) {
    const school = await this.prisma.school.create({
      data: {
        name: dto.name,
        location: dto.location,
        logoUrl: dto.logoUrl,
        establishedDate: dto.establishedDate,
        contact: {
          create: {
            email: dto.contact.email,
            phone: dto.contact.phone,
          },
        },
        domain: {
          create: {
            domain: dto.domain.domain,
            slug: dto.domain.slug,
          },
        },
      },
    });

    // Thow an error if school is not created
    if (!school) throw new Error('School not created');

    // // Create Contact
    // const contact = await this.prisma.contact.create({
    //   data: {
    //     email: dto.contact.email,
    //     phone: dto.contact.phone,
    //     School: {
    //       connect: {
    //         id: school.id,
    //       },
    //     },
    //   },
    // });

    // // Create Domain
    // const domain = await this.prisma.domain.create({
    //   data: {
    //     domain: dto.domain.domain,
    //     slug: dto.domain.slug,
    //     schoolId: school.id,
    //   },
    // });

    // // If contact or domain is not created, throw an error
    // if (!contact || !domain) throw new Error('Contact or Domain not created');

    // // Update school with contact and domain
    // const updatedSchool = await this.prisma.school.update({
    //   where: { id: school.id },
    //   data: {
    //     contact: {
    //       connect: {
    //         id: contact.id,
    //       },
    //     },
    //     domain: {
    //       connect: {
    //         id: domain.id,
    //       },
    //     },
    //   },
    // });

    // // If school is not updated, throw an error
    // if (!updatedSchool) throw new Error('School not updated');

    return school;
  }

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
