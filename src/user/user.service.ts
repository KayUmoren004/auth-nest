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

    // Remove the profile photo from the user data
    delete userData.profilePhoto;

    // Create a new userData object without the password
    const { password, ...newUserData } = userData;

    // Create the user
    const newUser = await this.prisma.user.create({
      data: {
        school: {
          connect: {
            id: schoolId,
          },
        },
        password: await hash(dto.password, 10),
        ...newUserData,
      },
    });

    // Exclude the password from the response
    const { password: pass, ...result } = newUser;

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

  // Upload a profile picture by User Id
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

  // Upload a profile picture by User Email
  async handlePhotoUploadByEmail(email: string, dto: Express.Multer.File) {
    if (!dto) throw new BadRequestException('No file uploaded');
    if (!email) throw new BadRequestException('No email provided');

    // Get User
    const user = await this.prisma.user.findUnique({
      where: { email },
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
    const fileName = `${user.id}.${dto.originalname.split('.').pop()}`;
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
      where: { email },
      data: { avatarUrl: photoData.publicUrl, blurhash: blurhash },
    });

    return { blurhash, photoUrl: photoData.publicUrl ?? null };
  }
}
