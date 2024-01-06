import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
}
