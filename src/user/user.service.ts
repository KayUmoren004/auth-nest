import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { SchoolService } from 'src/school/school.service';
import * as sharp from 'sharp';
import { ValidationError, encode } from 'blurhash';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private schoolService: SchoolService,
    private supabaseService: SupabaseService,
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

  // Upload a profile picture
  async handlePhotoUpload(userId: string, dto: Express.Multer.File) {
    // Get User
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('User not found');

    // Create Blurhash
    const { data, info } = await sharp(dto.buffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Validate that the image is a PNG

    if (info.width * info.height * 4 !== data.length) {
      console.log('Throwing error');
      throw new ValidationError('Width and height must match the pixels array');
    }

    const blurhash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      4,
    );

    // Upload photo to supabase
    const fileName = `${userId}.${dto.originalname.split('.').pop()}`;
    const contentType = dto.mimetype;

    const { data: supabaseData, error } = await this.supabaseService
      .from('profile-photos')
      .upload(fileName, dto.buffer, { upsert: true, contentType });

    if (error) {
      console.log(error);
      throw new BadRequestException('Error uploading photo');
    }

    // Get the photo URL
    const { data: photoData } = await this.supabaseService
      .from('profile-photos')
      .getPublicUrl(fileName);

    if (!photoData) {
      throw new BadRequestException('Error fetching photo');
    }

    // Update the user photo URL
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: photoData.publicUrl, blurhash: blurhash },
    });

    return { blurhash, photoUrl: photoData.publicUrl ?? null };
  }
}
