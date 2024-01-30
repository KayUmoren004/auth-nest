import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private schoolService: SchoolService,
  ) {}

  // Create a new user
  async create(dto: CreateUserDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // If user exists, throw an error
    if (user) throw new ConflictException('Email already exists');

    // Extract the school domain from the dto
    const { schoolDomain, ...userData } = dto;

    const schoolId = await this.schoolService.findIdByDomain(schoolDomain);

    const actualUser = { schoolId, ...userData };

    // Create the user
    const newUser = await this.prisma.user.create({
      data: { ...actualUser, password: await hash(dto.password, 10) },
    });

    // Exclude the password from the response
    const { password, ...result } = newUser;

    // Return the user
    return result;
  }

  // Find a user by email
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        school: {
          include: {
            domain: true,
            contact: true,
          },
        },
      },
    });
  }

  // Find a user by id
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        school: {
          include: {
            domain: true,
            contact: true,
          },
        },
      },
    });
  }
}
