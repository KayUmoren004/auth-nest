import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserPhotoDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('user')
export class UserController {
  // Constructor
  constructor(private userService: UserService) {}

  // Get User Profile Endpoint - GET /user/:id
  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    const user = await this.userService.findById(id);

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  // Post User Profile Photo Endpoint - POST /user/:id/photo
  @UseGuards(JwtGuard)
  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBadRequestResponse({
    description: 'Image too large OR Invalid image type',
  })
  async postUserProfilePhoto(
    @UploadedFile() dto: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.userService.handlePhotoUpload(id, dto);
  }

  // Post User Profile Photo Endpoint - POST /user/:email/photo
  @Post('/photo/:email')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBadRequestResponse({
    description: 'Image too large OR Invalid image type',
  })
  async postUserProfilePhotoEmail(
    @UploadedFile() dto: Express.Multer.File,
    @Param('email') email: string,
  ) {
    console.log('Running: ', email, dto);
    return await this.userService.handlePhotoUploadByEmail(email, dto);
  }
}
